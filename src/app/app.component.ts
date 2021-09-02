import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "DrawEat";
  /**抽到的卡片 */
  result = "";
  PlayCards = [
    "方塊3.png",
    "Joker.png",
    "黑桃A.png",
    "紅心K.png",
    "方塊J.png",
    "梅花3.png",
  ];
  /**所有牌 */
  Cards: Array<HTMLElement> = [];
  Card: HTMLElement;
  /**當前選擇的那個牌(在陣列中的index) */
  index = 0;
  /**剩餘幾步 */
  times = 0;
  /**每一張牌的圖片連結 */
  itemImageUrl = "../assets/picture/back.png";

  ngOnInit() {
    //把頁面上所有Cards放入陣列
    for (var i = 1; i <= 16; i++) {
      this.Card = document.getElementById("i" + i);
      if (this.Card) {
        this.Cards.push(this.Card);
      }
    }

    //Math.random() 取 0~1之間的亂數
    //Math.floor() 取最大整數
    //決定從哪個地方開始跑
    this.index = Math.floor(Math.random() * this.Cards.length);
  }

  /**亂數放置卡牌 */
  SetupRandomCards() {
    //
    for (let i = 0; i < this.Cards.length; i++) {
      let url =
        this.PlayCards[Math.floor(Math.random() * this.PlayCards.length)];
      this.Cards[i].setAttribute('src', "../assets/picture/" + url);//擺放圖片位置
      this.Cards[i].setAttribute('data', url);//設定圖片名稱為 屬性
      console.log(typeof this.Cards[i]);
    }
  }

  ButtonStart() {
    this.itemImageUrl = "../assets/picture/back.png";
    this.times = 27; //輪轉幾次
    this.Cards[this.index].className = "imgs"; //改變Cards的class

    this.start();
  }

  start() {
    //將當前index狀態設為一般(未選取)
    this.Cards[this.index].className = "clear"; //先清除狀態

    //跑下一張
    this.index++;

    //如果超過陣列範圍，則歸零
    if (this.index > this.Cards.length - 1) {
      this.index = 0;
    }
    //將下一張設為選取樣式
    this.Cards[this.index].className = "imgs";

    if (this.times > 0) {
      this.times--;

      //倒數幾次的時候翻牌
      if (this.times == 5) this.SetupRandomCards();
      //50毫秒後清空
      setTimeout(() => {
        this.start();
      }, 50);
    } else {
      //如果times==0
      //則表示當前index就是被選取(抽中)的那個
      this.result = this.Cards[this.index].getAttribute('data').replace(".png", "");
    }
  }
}
