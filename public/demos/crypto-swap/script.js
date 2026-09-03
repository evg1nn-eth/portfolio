const TOKENS = {
  ETH: { symbol: 'ETH', name: 'Ethereum', icon: 'assets/logo-eth.svg', address: '0x000...000', price: 3000, balance: 0.7559 },
  USDC: { symbol: 'USDC', name: 'USD Coin', icon: 'assets/logo-usdc.svg', address: '0x832...913', price: 1, balance: 0 },
  USDT: { symbol: 'USDT', name: 'Tether', icon: 'assets/logo-usdt.svg', address: '0xfde...bb2', price: 1, balance: 1250.42 },
  DAI: { symbol: 'DAI', name: 'Dai', icon: 'assets/logo-dai.svg', address: '0x50c...0Cb', price: 1, balance: 340.1 },
  MORPHO: { symbol: 'MORPHO', name: 'Morpho', icon: 'assets/logo-morpho.svg', address: '0x450...857', price: 1.85, balance: 128.5 },
};

const TOKEN_ORDER = ['ETH', 'USDC', 'USDT', 'DAI', 'MORPHO'];

const NETWORKS = {
  ethereum: { label: 'Ethereum', icon: 'assets/net-ethereum.svg' },
  arbitrum: { label: 'Arbitrum', icon: 'assets/net-arbitrum.svg' },
  base: { label: 'Base', icon: 'assets/net-base.svg' },
  hyperevm: { label: 'HyperEVM', icon: 'assets/net-hyperevm.svg' },
  optimism: { label: 'Optimism', icon: 'assets/net-optimism.svg' },
  blast: { label: 'Blast', icon: 'assets/net-blast.svg' },
  bnb: { label: 'BNB Chain', icon: 'assets/net-bnb.svg' },
};

const NETWORK_ORDER = ['ethereum', 'arbitrum', 'base', 'hyperevm', 'optimism', 'blast', 'bnb'];

const state = {
  sellToken: 'ETH',
  buyToken: 'USDC',
  sellValue: '',
  network: 'base',
  activeSide: null,
  search: '',
  networkDropdownOpen: false,
  pendingSwap: null,
};

const refs = {
  sell: {
    input: document.querySelector('[data-role="sell-input"]'),
    tokenButton: document.querySelector('[data-role="sell-token-button"]'),
    tokenIcon: document.querySelector('[data-role="sell-token-icon"]'),
    tokenSymbol: document.querySelector('[data-role="sell-token-symbol"]'),
    usd: document.querySelector('[data-role="sell-usd"]'),
    balance: document.querySelector('[data-role="sell-balance"]'),
  },
  buy: {
    output: document.querySelector('[data-role="buy-output"]'),
    tokenButton: document.querySelector('[data-role="buy-token-button"]'),
    tokenIcon: document.querySelector('[data-role="buy-token-icon"]'),
    tokenSymbol: document.querySelector('[data-role="buy-token-symbol"]'),
    usd: document.querySelector('[data-role="buy-usd"]'),
    balance: document.querySelector('[data-role="buy-balance"]'),
  },
};

const swapView = document.querySelector('[data-role="swap-view"]');
const selectView = document.querySelector('[data-role="select-view"]');
const selectClose = document.querySelector('[data-role="select-close"]');
const tokenSearchInput = document.querySelector('[data-role="token-search"]');
const tokenListEl = document.querySelector('[data-role="token-list"]');

const confirmView = document.querySelector('[data-role="confirm-view"]');
const confirmClose = document.querySelector('[data-role="confirm-close"]');
const confirmIcon = document.querySelector('[data-role="confirm-icon"]');
const confirmTitle = document.querySelector('[data-role="confirm-title"]');
const confirmActionButton = document.querySelector('[data-role="confirm-action"]');
const confirmStep1 = document.querySelector('[data-role="confirm-step-1"]');
const confirmStep1Icon = document.querySelector('[data-role="confirm-step-1-icon"]');
const confirmStep2 = document.querySelector('[data-role="confirm-step-2"]');
const confirmStep2Icon = document.querySelector('[data-role="confirm-step-2-icon"]');

let confirmTimer = null;

const networkButton = document.querySelector('[data-role="network-button"]');
const networkIcon = document.querySelector('[data-role="network-icon"]');
const networkLabel = document.querySelector('[data-role="network-label"]');
const networkDropdown = document.querySelector('[data-role="network-dropdown"]');
const networkDropdownList = document.querySelector('[data-role="network-dropdown-list"]');

const swapArrowButton = document.querySelector('.swap-arrow');
const submitButton = document.querySelector('[data-role="submit"]');
const quickAmountButtons = document.querySelectorAll('.quick-amount');
const swapChart = document.querySelector('[data-role="swap-chart"]');
const swapRateEl = document.querySelector('[data-role="swap-rate"]');
const networkBadgeEls = document.querySelectorAll('[data-role="network-badge"]');

function formatToken(value, token) {
  if (!isFinite(value) || value <= 0) return '0';
  const decimals = token === 'ETH' || token === 'MORPHO' ? 6 : 2;
  return value.toFixed(decimals).replace(/0+$/, '').replace(/\.$/, '');
}

function formatUsd(value) {
  if (!isFinite(value) || value <= 0) return '$0';
  return `$${value.toFixed(2)}`;
}

function getBuyAmount() {
  const sellNumber = parseFloat(state.sellValue);
  if (!state.sellValue || Number.isNaN(sellNumber) || sellNumber <= 0) return 0;
  return (sellNumber * TOKENS[state.sellToken].price) / TOKENS[state.buyToken].price;
}

function renderTokenButton(side) {
  const r = refs[side];
  const tokenKey = side === 'sell' ? state.sellToken : state.buyToken;
  const token = TOKENS[tokenKey];
  r.tokenIcon.src = token.icon;
  r.tokenSymbol.textContent = token.symbol;
}

function renderNetworkBadges() {
  const badgeSrc = NETWORKS[state.network].icon;
  networkBadgeEls.forEach((img) => {
    img.src = badgeSrc;
  });
}

function renderSubLines() {
  const buyAmount = getBuyAmount();
  const sellNumber = parseFloat(state.sellValue) || 0;

  refs.sell.usd.textContent = formatUsd(sellNumber * TOKENS[state.sellToken].price);
  refs.sell.balance.textContent = formatToken(TOKENS[state.sellToken].balance, state.sellToken);

  refs.buy.usd.textContent = formatUsd(buyAmount * TOKENS[state.buyToken].price);
  refs.buy.balance.textContent = formatToken(TOKENS[state.buyToken].balance, state.buyToken);
}

function renderQuickAmounts() {
  const hasBalance = TOKENS[state.sellToken].balance > 0;
  quickAmountButtons.forEach((button) => {
    button.disabled = !hasBalance;
  });
}

function hasValidAmount() {
  const sellNumber = parseFloat(state.sellValue);
  return Boolean(state.sellValue) && !Number.isNaN(sellNumber) && sellNumber > 0;
}

function renderSubmit() {
  const hasAmount = hasValidAmount();
  submitButton.disabled = !hasAmount;
  submitButton.textContent = hasAmount ? 'Swap' : 'Enter amount to swap';
}

function renderSwapChart() {
  const hasAmount = hasValidAmount();
  swapChart.hidden = !hasAmount;
  if (!hasAmount) return;
  const rate = TOKENS[state.buyToken].price / TOKENS[state.sellToken].price;
  swapRateEl.textContent = `1 ${TOKENS[state.buyToken].symbol} = ${formatToken(rate, state.sellToken)} ${TOKENS[state.sellToken].symbol}`;
}

function recalculate() {
  refs.buy.output.textContent = formatToken(getBuyAmount(), state.buyToken);
  renderSubLines();
  renderSubmit();
  renderSwapChart();
}

function renderSwapView() {
  renderTokenButton('sell');
  renderTokenButton('buy');
  renderNetworkBadges();
  renderQuickAmounts();
  recalculate();
}

// --- Select token view ---

function openSelectView(side) {
  state.activeSide = side;
  state.search = '';
  tokenSearchInput.value = '';
  closeNetworkDropdown();
  renderTokenList();
  swapView.hidden = true;
  selectView.hidden = false;
  tokenSearchInput.focus();
}

function closeSelectView() {
  state.activeSide = null;
  closeNetworkDropdown();
  selectView.hidden = true;
  swapView.hidden = false;
}

function renderTokenList() {
  const currentKey = state.activeSide === 'buy' ? state.buyToken : state.sellToken;
  const query = state.search.trim().toLowerCase();

  const matches = TOKEN_ORDER.filter((key) => {
    if (!query) return true;
    const t = TOKENS[key];
    return (
      t.name.toLowerCase().includes(query) ||
      t.symbol.toLowerCase().includes(query) ||
      t.address.toLowerCase().includes(query)
    );
  });

  tokenListEl.innerHTML = '';

  if (matches.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'token-list__empty';
    empty.textContent = 'No tokens found';
    tokenListEl.appendChild(empty);
    return;
  }

  matches.forEach((key) => {
    const token = TOKENS[key];
    const isSelected = key === currentKey;

    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'token-row' + (isSelected ? ' token-row--selected' : '');

    row.innerHTML = `
      <span class="token-row__main">
        <span class="token-row__icon">
          <img src="${token.icon}" alt="" />
          <img src="${NETWORKS[state.network].icon}" alt="" />
        </span>
        <span class="token-row__info">
          <span class="token-row__name">${token.name}</span>
          <span class="token-row__meta">
            <span class="token-row__symbol">${token.symbol}</span>
            <span class="token-row__address">${token.address}</span>
          </span>
        </span>
      </span>
      <span class="token-row__balance">
        <span class="token-row__balance-amount">${formatToken(token.balance, key)}</span>
        <span class="token-row__balance-usd">${formatUsd(token.balance * token.price)}</span>
      </span>
    `;

    row.addEventListener('click', () => selectToken(state.activeSide, key));
    tokenListEl.appendChild(row);
  });
}

function selectToken(side, tokenKey) {
  const otherSide = side === 'sell' ? 'buy' : 'sell';
  const otherKey = otherSide === 'sell' ? state.sellToken : state.buyToken;

  if (tokenKey === otherKey) {
    const temp = state.sellToken;
    state.sellToken = state.buyToken;
    state.buyToken = temp;
  } else if (side === 'sell') {
    state.sellToken = tokenKey;
  } else {
    state.buyToken = tokenKey;
  }

  closeSelectView();
  renderSwapView();
}

// --- Network dropdown ---

function renderNetworkButton() {
  const network = NETWORKS[state.network];
  networkIcon.src = network.icon;
  networkLabel.textContent = network.label;
}

function renderNetworkDropdown() {
  networkDropdownList.innerHTML = '';
  NETWORK_ORDER.forEach((id) => {
    const network = NETWORKS[id];
    const isSelected = id === state.network;

    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'token-option' + (isSelected ? ' token-option--selected' : '');

    option.innerHTML = `
      <img class="token-option__network-icon" src="${network.icon}" width="20" height="20" alt="" />
      <span class="token-option__label">${network.label}</span>
      ${isSelected ? '<img class="token-option__check" src="assets/icon-check.svg" width="20" height="20" alt="" />' : ''}
    `;

    option.addEventListener('click', () => {
      state.network = id;
      renderNetworkButton();
      renderNetworkDropdown();
      renderNetworkBadges();
      if (state.activeSide) renderTokenList();
      closeNetworkDropdown();
    });

    networkDropdownList.appendChild(option);
  });
}

function toggleNetworkDropdown() {
  state.networkDropdownOpen = !state.networkDropdownOpen;
  networkDropdown.hidden = !state.networkDropdownOpen;
}

function closeNetworkDropdown() {
  state.networkDropdownOpen = false;
  networkDropdown.hidden = true;
}

// --- Confirm flow ---

function setStepState(row, icon, status) {
  row.classList.remove('confirm-step--done');
  if (status === 'done') {
    row.classList.add('confirm-step--done');
    icon.src = 'assets/icon-check.svg';
    icon.hidden = false;
    icon.classList.remove('is-spinning');
  } else if (status === 'active') {
    icon.src = 'assets/icon-spinner-20.svg';
    icon.hidden = false;
    icon.classList.remove('is-spinning');
  } else {
    icon.hidden = true;
    icon.classList.remove('is-spinning');
  }
}

function renderConfirmStage(stage) {
  const sellSymbol = TOKENS[state.sellToken].symbol;
  const buySymbol = TOKENS[state.buyToken].symbol;

  if (stage === 'signing') {
    confirmIcon.src = 'assets/icon-spinner-40.svg';
    confirmIcon.classList.add('is-spinning');
    confirmTitle.textContent = `Swap ${sellSymbol} for ${buySymbol}`;
    setStepState(confirmStep1, confirmStep1Icon, 'active');
    setStepState(confirmStep2, confirmStep2Icon, 'pending');
    confirmActionButton.textContent = 'Sign message';
    confirmActionButton.disabled = true;
  } else if (stage === 'confirming') {
    confirmIcon.src = 'assets/icon-spinner-40.svg';
    confirmIcon.classList.add('is-spinning');
    confirmTitle.textContent = `Swap ${sellSymbol} for ${buySymbol}`;
    setStepState(confirmStep1, confirmStep1Icon, 'done');
    setStepState(confirmStep2, confirmStep2Icon, 'active');
    confirmActionButton.textContent = 'Confirm swap';
    confirmActionButton.disabled = true;
  } else if (stage === 'success') {
    confirmIcon.src = 'assets/logo-success.svg';
    confirmIcon.classList.remove('is-spinning');
    confirmTitle.textContent = 'Swap Successful';
    setStepState(confirmStep1, confirmStep1Icon, 'done');
    setStepState(confirmStep2, confirmStep2Icon, 'done');
    confirmActionButton.textContent = 'Done';
    confirmActionButton.disabled = false;
  }
}

function startConfirmFlow() {
  state.pendingSwap = {
    sellToken: state.sellToken,
    buyToken: state.buyToken,
    sellAmount: parseFloat(state.sellValue),
    buyAmount: getBuyAmount(),
  };

  swapView.hidden = true;
  confirmView.hidden = false;

  renderConfirmStage('signing');
  confirmTimer = setTimeout(() => {
    renderConfirmStage('confirming');
    confirmTimer = setTimeout(() => {
      renderConfirmStage('success');
    }, 1400);
  }, 1400);
}

function cancelConfirmFlow() {
  clearTimeout(confirmTimer);
  confirmTimer = null;
  state.pendingSwap = null;
  confirmView.hidden = true;
  swapView.hidden = false;
}

function roundBalance(value) {
  return Math.round(value * 1e8) / 1e8;
}

function finishConfirmFlow() {
  clearTimeout(confirmTimer);
  confirmTimer = null;

  const swap = state.pendingSwap;
  if (swap) {
    TOKENS[swap.sellToken].balance = roundBalance(TOKENS[swap.sellToken].balance - swap.sellAmount);
    TOKENS[swap.buyToken].balance = roundBalance(TOKENS[swap.buyToken].balance + swap.buyAmount);
    state.pendingSwap = null;
  }

  state.sellValue = '';
  refs.sell.input.value = '';
  confirmView.hidden = true;
  swapView.hidden = false;
  renderSwapView();
}

// --- Events ---

refs.sell.input.addEventListener('input', (event) => {
  let value = event.target.value.replace(',', '.');
  value = value.replace(/[^0-9.]/g, '');

  const firstDot = value.indexOf('.');
  if (firstDot !== -1) {
    value = value.slice(0, firstDot + 1) + value.slice(firstDot + 1).replace(/\./g, '');
  }

  event.target.value = value;
  state.sellValue = value;
  recalculate();
});

refs.sell.tokenButton.addEventListener('click', () => openSelectView('sell'));
refs.buy.tokenButton.addEventListener('click', () => openSelectView('buy'));
selectClose.addEventListener('click', closeSelectView);

submitButton.addEventListener('click', () => {
  if (!submitButton.disabled) startConfirmFlow();
});

confirmClose.addEventListener('click', cancelConfirmFlow);
confirmActionButton.addEventListener('click', () => {
  if (!confirmActionButton.disabled) finishConfirmFlow();
});

tokenSearchInput.addEventListener('input', (event) => {
  state.search = event.target.value;
  renderTokenList();
});

networkButton.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleNetworkDropdown();
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.network-select')) {
    closeNetworkDropdown();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (state.networkDropdownOpen) closeNetworkDropdown();
  else if (state.activeSide) closeSelectView();
  else if (!confirmView.hidden) cancelConfirmFlow();
});

swapArrowButton.addEventListener('click', () => {
  const temp = state.sellToken;
  state.sellToken = state.buyToken;
  state.buyToken = temp;
  renderSwapView();
});

quickAmountButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const percent = parseFloat(button.dataset.percent);
    const amount = TOKENS[state.sellToken].balance * percent;
    state.sellValue = formatToken(amount, state.sellToken);
    refs.sell.input.value = state.sellValue;
    recalculate();
  });
});

renderNetworkButton();
renderNetworkDropdown();
renderSwapView();
