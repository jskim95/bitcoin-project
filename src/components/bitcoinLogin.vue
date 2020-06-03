<template>
  <div id="ALL">
    <div class="noMean"></div>

    <div class="loginBox">
      <div class="upbitLogo"></div>

      <div class="loginInfo">

        <p class="A">방문하신 사이트의 주소가 아래와 일치하는지 확인해주세요.</p>
        <p>https://upbit.com</p>

        <a href="#" class="B">
          <img src="../assets/kakao-talk.png">
          <span>카카오계정으로 로그인</span>
        </a>

        <div class="C">
          <input type="radio"></input>
          <span>로그인 상태 유지</span>
        </div>

        <div class="D">
          <p>- 카카오계정으로 간편하고 안전하게 로그인(회원가입)할 수 있습니다.</p>
          <p>- 카카오계정이 기억나지 않으시나요?</p>
        </div>


      </div>
    </div>


  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

#ALL {
  background: #f4f5f8;
  width: 100%;
  min-height: 700px;
}

.noMean {
  background: #f4f5f8;
  height: 1px;
}

.loginBox {
  min-height: 300px;
  background: white;
  margin-left: 33%;
  margin-top: 10%;
  width: 550px;
  padding: 50px 70px 60px;
  background-color: #fff;
  box-shadow: 2px 2px 4px #dee1e7;
  box-sizing: border-box;
  text-align: center;
}

.upbitLogo {
  width: 160px;
  height: 36px;
  background: url(https://cdn.upbit.com/images/bg.7521805.png) -150px -420px no-repeat;
  margin-left: 30%;
}

.loginInfo {
  margin-top: 5%;
}

.A {
  color: #666;
  font-size: 13px;
  font-weight: bold;
}
.B {
    display: block;
    width: 100%;
    height: 52px;
    margin-top: 7%;
    line-height: 50px;
    font-size: 17px;
    font-weight: 550;
    text-align: center;
    text-decoration: none;

    background-color: #ffdc00;
    color: #3c1e1e;
}
.B img{
  margin-top: 8px;
  width: 24px;
  height: 23px;
  margin-right: 5px;
}

.C {
  margin-top: 2%;
  text-align: left;
  color: #666;
  font-size: 12px;
}

.D {
  color: #999;
  font-size: 13px;
  text-align: left;
  margin-top: 4%;
}


p { margin: 8px 0px 0px 0px; line-height: 120%; }
</style>
