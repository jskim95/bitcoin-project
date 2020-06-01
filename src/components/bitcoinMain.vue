<template>
  <div id="ALL">

    <div class="mainBackground">

      <div class="mainBackgroundContent">
        <h1>가장 신뢰받는 글로벌 표준 디지털 자산 거래소</h1>
        <p class="">안전하고 투명한 시스템으로 빠르고 편리한 거래 환경을 제공합니다.</p>

        <div class="coinNumber">
          <div class="coin">
            <span class="blue">172</span><br>
            <span class="gray left">Coins</span>
          </div>
          <div class="market">
            <span class="blue">260</span><br>
            <span class="gray right">Markets</span>
          </div>
        </div>

        <div class="moveButton">
          <div class="moveTrade">
            거래소 둘러보기
          </div>
          <div class="moveLogin">
            로그인
          </div>
        </div>

      </div>

      <img src="../assets/mainBackground.png">
    </div>

    <div class="warning">
      <img src="../assets/mainWarning.png">
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  #mainBackground {
    position: relative;
  }
  .mainBackground img{
    width: 100%;
    height: 400px;
    opacity: 0.7;
    z-index: 1;
  }
  .mainBackgroundContent {
    position: absolute;
    font-weight: bold;
    width: 100%;
    margin-top: 2%;
    text-align: center;
    color: black;
    z-index: 2;
  }
  .coinNumber {
    width: 100%;
    margin-top: 3%;
    display: flex;
  }
  .coin {
    width: 50%;
    text-align: right;
    border-right: 1.2px solid #74AFF7;
    padding-right: 1%;
  }
  .market {
    width: 50%;
    text-align: left;
    padding-left: 1%;
  }
  .blue {
    font-size: 48px;
    color: #093687
  }
  .gray {
    font-size: 17px;
    color: #7588aa
  }
  .left {
    margin-right: 2.5%;
  }
  .right {
    margin-left: 1.5%;
  }
  .moveButton {
    width: 100%;
    font-size: 17px;
    display: flex;
    margin-top: 2%;
    padding-left: 39.7%;
  }
  .moveTrade {
    color: white;
    width: 130px;
    /* height: 40px; */
    padding: 0.8%;
    margin-right: 0.5%;
    background-color: #0062df;
  }
  .moveLogin {
    color: white;
    width: 130px;
    /* height: 40px; */
    padding: 0.5%;
    padding-top: 0.7%;
    background-color: #093687;
  }
  .warning {
    background: #2b2b2b
  }
</style>
