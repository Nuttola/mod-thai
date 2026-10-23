type SortKey = 'newest' | 'name' | 'popular';

type CardEl = HTMLElement & {
  dataset: {
    title?: string;
    status?: string;
    game?: string;
    updated?: string;
    popular?: string;
    search?: string;
  };
};

const normalize = (value: string) =>
  value
    .normalize('NFC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const SORT_KEYS: SortKey[] = ['newest', 'name', 'popular'];

export function initModFilter(): void {
  const grid = document.getElementById('mod-grid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll<CardEl>('[data-mod]'));
  if (cards.length === 0) return;

  const searchInput = document.getElementById('mod-search') as HTMLInputElement | null;
  const gameSelect = document.getElementById('mod-game') as HTMLSelectElement | null;
  const sortSelect = document.getElementById('mod-sort') as HTMLSelectElement | null;
  const countEl = document.getElementById('mod-count');
  const emptyEl = document.getElementById('mod-empty');
  const clearBtn = document.getElementById('mod-clear') as HTMLButtonElement | null;
  const emptyClearBtn = document.getElementById('mod-empty-clear') as HTMLButtonElement | null;
  const chips = Array.from(document.querySelectorAll<HTMLButtonElement>('#mod-status [data-status]'));

  const state = {
    q: '',
    status: 'all',
    game: 'all',
    sort: 'newest' as SortKey,
  };

  const isDirty = () =>
    state.q.trim() !== '' || state.status !== 'all' || state.game !== 'all' || state.sort !== 'newest';

  const writeUrl = () => {
    const params = new URLSearchParams();
    if (state.q.trim()) params.set('q', state.q.trim());
    if (state.status !== 'all') params.set('status', state.status);
    if (state.game !== 'all') params.set('game', state.game);
    if (state.sort !== 'newest') params.set('sort', state.sort);

    const qs = params.toString();
    const next = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;

    try {
      window.history.replaceState(null, '', next);
    } catch {
      /* sandbox — ไม่เป็นไร */
    }
  };

  const readUrl = () => {
    const params = new URLSearchParams(window.location.search);
    state.q = params.get('q') ?? '';

    const status = params.get('status') ?? 'all';
    state.status = status === 'all' || cards.some((c) => c.dataset.status === status) ? status : 'all';

    const game = params.get('game');
    state.game = game && cards.some((card) => card.dataset.game === game) ? game : 'all';

    const sort = params.get('sort') as SortKey | null;
    state.sort = sort && SORT_KEYS.includes(sort) ? sort : 'newest';

    if (searchInput) searchInput.value = state.q;
    if (gameSelect) gameSelect.value = state.game;
    if (sortSelect) sortSelect.value = state.sort;

    syncChips();
  };

  function syncChips() {
    for (const chip of chips) {
      const value = chip.dataset.status ?? 'all';
      const active = value === state.status;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  const matches = (card: CardEl, tokens: string[]) => {
    if (state.status !== 'all' && card.dataset.status !== state.status) return false;
    if (state.game !== 'all' && card.dataset.game !== state.game) return false;
    if (tokens.length === 0) return true;

    const haystack = card.dataset.search ?? '';
    return tokens.every((token) => haystack.includes(token));
  };

  const compare = (a: CardEl, b: CardEl) => {
    if (state.sort === 'name') {
      return (a.dataset.title ?? '').localeCompare(b.dataset.title ?? '', 'th');
    }
    if (state.sort === 'popular') {
      const popularA = a.dataset.popular === 'true' ? 1 : 0;
      const popularB = b.dataset.popular === 'true' ? 1 : 0;
      if (popularA !== popularB) return popularB - popularA;
    }
    return (b.dataset.updated ?? '').localeCompare(a.dataset.updated ?? '');
  };

  const apply = (updateUrl = true) => {
    const tokens = normalize(state.q).split(' ').filter(Boolean);
    let visible = 0;

    for (const card of cards) {
      const ok = matches(card, tokens);
      card.hidden = !ok;
      if (ok) visible += 1;
    }

    for (const card of [...cards].sort(compare)) {
      grid.appendChild(card);
    }

    if (countEl) {
      countEl.textContent = `แสดง ${visible} จาก ${cards.length} มอด`;
    }
    if (emptyEl) {
      emptyEl.hidden = visible !== 0;
    }
    grid.hidden = visible === 0;

    if (clearBtn) clearBtn.disabled = !isDirty();
    if (emptyClearBtn) emptyClearBtn.disabled = !isDirty();

    if (updateUrl) writeUrl();
  };

  const reset = () => {
    state.q = '';
    state.status = 'all';
    state.game = 'all';
    state.sort = 'newest';

    if (searchInput) searchInput.value = '';
    if (gameSelect) gameSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'newest';

    syncChips();
    apply();
  };

  for (const chip of chips) {
    chip.addEventListener('click', () => {
      state.q = searchInput?.value ?? state.q;
      state.status = chip.dataset.status ?? 'all';
      syncChips();
      apply();
    });
  }

  let debounce: number | undefined;
  searchInput?.addEventListener('input', () => {
    window.clearTimeout(debounce);
    debounce = window.setTimeout(() => {
      state.q = searchInput.value;
      apply();
    }, 120);
  });

  gameSelect?.addEventListener('change', () => {
    state.game = gameSelect.value || 'all';
    apply();
  });

  sortSelect?.addEventListener('change', () => {
    const value = sortSelect.value as SortKey;
    state.sort = SORT_KEYS.includes(value) ? value : 'newest';
    apply();
  });

  clearBtn?.addEventListener('click', reset);
  emptyClearBtn?.addEventListener('click', reset);

  document.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement | null;
    const typing =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      target?.isContentEditable === true;

    if (event.key === '/' && !typing) {
      event.preventDefault();
      searchInput?.focus();
      searchInput?.select();
    }

    if (event.key === 'Escape' && document.activeElement === searchInput) {
      if (searchInput) searchInput.value = '';
      state.q = '';
      apply();
      searchInput?.blur();
    }
  });

  window.addEventListener('popstate', () => {
    readUrl();
    apply(false);
  });

  readUrl();
  apply(false);
}
