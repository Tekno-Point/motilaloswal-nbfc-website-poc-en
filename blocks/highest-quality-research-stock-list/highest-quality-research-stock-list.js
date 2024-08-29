export default async function decorate(block) {
  const api = block.querySelector('a').href;
  block.innerHTML = '';
  const resp = await fetch(api);
  const data = await resp.json();
  data.data.forEach((element) => {
    block.innerHTML += `<div>
  <a href="https://www.motilaloswal.com/markets/equity-market-overview/KALYANKJIL/2955/42402/nse">
    <div class="card-wrapper">
      <div class="">
        <div class="card-type">
          <span class="greencolor">BUY</span>
        </div>
        <div class="greylabel">
          <span>${element.nudge}</span>
        </div>
      </div>
      <div class="card-title">
        <span>${element['stock-name']}</span>
      </div>
      <div class="card-price">
        <div>
          <div>${element.price}</div>
          <div class="lightgrey">Reco Price</div>
        </div>
        <div>
          <div>${element.target}</div>
          <div class="lightgrey">Target Price</div>
        </div>
      </div>
      <div class="card-return">
        <div class="lightgrey">Potential Return</div>
        <div class="greencolor">${element.return}</div>
      </div>
    </div>
  </a>
</div>`;
  });
}
