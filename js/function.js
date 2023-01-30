/*
 * @Author: zhengduo
 * @Date: 2023-01-29 13:07:57
 * @LastEditors: zhengduo
 * @LastEditTime: 2023-01-29 16:43:14
 * @Descripttion: 
 */


function startGame() {
  // 隐藏准备页
  document.getElementsByClassName('ready-screen')[0].style.display = 'none';
  // 打开对话页
  document.getElementsByClassName('game-page')[0].style.display = 'flex';
  // 开始对话
  gogogo();
}

function rabbitSaying(msg) {
  let obj = document.getElementsByClassName('saying')[0];
  let rabbit = document.createElement('div');
  rabbit.className = 'rabbit';
  rabbit.innerHTML = `
        <div class="head">
          <img src="./img/head.png" />
        </div>
        <div class="msg">
          ${msg}
        </div>
  `;
  obj.appendChild(rabbit);
  obj.scrollTop = obj.scrollHeight;
}


function reply(msg) {
  let obj = document.getElementsByClassName('saying')[0];
  let rabbit = document.createElement('div');
  rabbit.className = 'owner';
  rabbit.innerHTML = `
        <div class="msg">
          ${msg}
        </div>
        <div class="head">
          <img src="./img/hzyr.jpg" />
        </div>
  `;
  obj.appendChild(rabbit);
  obj.scrollTop = obj.scrollHeight;

  addChoice([]);
}

function addChoice(arr) {
  let obj = document.getElementsByClassName('selector')[0];
  let html = '';
  for (var i = 0; i < arr.length; i++) {
    html += `
      <li onclick="chooseItem(${i})">${arr[i]}</li>
    `;
  }
  obj.innerHTML = html;
}


function startAuto() {
  let timer = setInterval(function () {
    if (typeof conversation[0] === 'object') {
      // 该选择了
      choice = conversation[0];
      choiceSaying = [];
      for (let s of choice) {
        choiceSaying.push(s[0]);
      }
      addChoice(choiceSaying);
      clearInterval(timer);
    } else if (conversation.length === 0) {
      clearInterval(timer);
      // 结束
      console.log('结束');
      alert("对话结束")
    } else {
      saying = conversation.shift();
      rabbitSaying(saying);
    }
  }, 1000);
}

function chooseItem(index) {
  reply(choiceSaying[index]);
  conversation = choice[index];
  conversation.shift();
  startAuto()
}

let conversation = [
  "你知道唐僧吗？",
  "那个西天取经的唐僧",
  [
    ["我当然知道啦", "哦",
      "那好吧，你知道我就不说了",
      "拜拜"
    ],
    ["你给我说说", "好的",
      "其实吧，我啥也不知道",
      [
        ["你有病吧！", "嗯呢",
          "那我去治病了，再见"
        ]
      ]
    ]
  ]
]

let choice, choiceSaying = [];
let saying = "";

function gogogo() {
  saying = conversation.shift();
  rabbitSaying(saying);
  startAuto();
}