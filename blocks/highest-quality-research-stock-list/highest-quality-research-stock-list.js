export default async function decorate(block) {
  const api = block.querySelector('a').href;
  block.innerHTML = '';
  const resp = await fetch(api);
  const data = await resp.json();
  data.data.forEach(element => {
    block.innerHTML += `
<a
  id="wt50_OutSystemsUIWeb_wtLayout_block_wtContent_wtMainContent_MO_Website_CW_wt249_block_wtListRecords1_ctl00_wt9"
  tabindex="393"
  class="mobflex100 marketOverviewBox1"
  href="https://www.motilaloswal.com/markets/equity-market-overview/KALYANKJIL/2955/42402/nse"
  ><div class="mobflex100">
    <div class="dflex spacebetween align-flex-start">
      <div><span class="greencolor font-semi-bold f14">BUY</span></div>
      <div style="display: none">
        <img alt="" src="/MO_Website_Th/img/Frame158094.svg?1595" />
      </div>
      <div>
        <span class="text-uppercase val f12 lightblack greylabel mtop0"
          >${element.nudge}</span
        >
      </div>
    </div>
    <div class="tradingOppTitleHeight">
      <span class="font-semi-bold indies_title f18">${element['stock-name']}</span>
    </div>
    <div class="dflex spacebetween aligncenter">
      <div>
        <div class="f14 font-semi-bold">569.45</div>
        <div class="f14 lightgrey mtop5">Reco Price</div>
      </div>
      <div>
        <div class="f14 font-semi-bold text-right">610.60</div>
        <div class="f14 lightgrey mtop5 text-right">Target Price</div>
      </div>
    </div>
    <div class="country_name" style="display: none"></div>
    <div class="mtop5" style="display: none">
      <span class="f18 font-semi-bold color454B54">559.75</span>
      <div style="display: none">
        <span class="f12 greencolor font-semi-bold ml5">(-0.88%)</span>
      </div>
    </div>
    <div class="mtop16 dflex spacebetween aligncenter">
      <div class="f14 lightgrey">Potential Return</div>
      <div class="f24 greencolor mtop0 font-semi-bold">+6.74%</div>
    </div>
  </div></a
>
`
  });
}