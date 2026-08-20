var girisEkrani = document.getElementById("giris-ekrani");
var oyunEkrani  = document.getElementById("oyun-ekrani");
var playBtn     = document.getElementById("playBtn");
var turBtnlar   = document.querySelectorAll(".turBtn");
var kutular     = document.querySelectorAll(".cell");
var skorEl      = document.getElementById("skor");
var durumEl     = document.getElementById("durum");

var toplamTur   = 3;   
var mevcutTur   = 1;
var skorX       = 0;
var skorO       = 0;
var sira        = "X";
var oyunBitti   = false;

var kazanmaDurumlari = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];


turBtnlar.forEach(function(btn){
  btn.addEventListener("click", function(){
    turBtnlar.forEach(function(b){ b.classList.remove("secili"); });
    btn.classList.add("secili");
    toplamTur = parseInt(btn.getAttribute("data-tur"), 10);
  });
});

playBtn.addEventListener("click", function(){
  girisEkrani.style.display = "none";
  oyunEkrani.style.display = "block";
  mevcutTur = 1;
  skorX = 0;
  skorO = 0;
  tahtayiTemizle();
  skorGuncelle();
});


var menuBtn     = document.getElementById("menuBtn");
var menuKutusu  = document.getElementById("menuKutusu");
var anaMenuBtn  = document.getElementById("anaMenuBtn");

menuBtn.addEventListener("click", function(){
  var acik = menuKutusu.style.display === "flex";
  menuKutusu.style.display = acik ? "none" : "flex";
});

anaMenuBtn.addEventListener("click", function(){
  menuKutusu.style.display = "none";
  oyunEkrani.style.display = "none";
  girisEkrani.style.display = "flex";
});


function skorGuncelle(){
  skorEl.innerHTML = "X: " + skorX + " &nbsp;|&nbsp; O: " + skorO +
                      " &nbsp;|&nbsp; Tur: " + mevcutTur + " / " + toplamTur;
}

function tahtayiTemizle(){
  kutular.forEach(function(k){
    k.textContent = "";
    k.style.color = "";
  });
  durumEl.textContent = "";
  oyunBitti = false;
  sira = "X";
}

function kazananVarMi(){
  for (var i = 0; i < kazanmaDurumlari.length; i++){
    var d = kazanmaDurumlari[i];
    var a = kutular[d[0]].textContent;
    var b = kutular[d[1]].textContent;
    var c = kutular[d[2]].textContent;
    if (a !== "" && a === b && b === c){
      return a;
    }
  }
  return null;
}

function berabereMi(){
  var doluSayisi = 0;
  kutular.forEach(function(k){
    if (k.textContent !== "") doluSayisi++;
  });
  return doluSayisi === 9;
}


kutular.forEach(function(kutu){
  kutu.addEventListener("click", function(){
    if (oyunBitti || kutu.textContent !== "") return;

    kutu.textContent = sira;
    kutu.style.color = (sira === "X") ? "red" : "blue";

    var kazanan = kazananVarMi();

    if (kazanan !== null){
      oyunBitti = true;
      durumEl.textContent = kazanan + " KAZANDI!";

      if (kazanan === "X") skorX++; else skorO++;
      skorGuncelle();

      sonrakiTura();
      return;
    }

    if (berabereMi()){
      oyunBitti = true;
      durumEl.textContent = "BERABERE!";
      sonrakiTura();
      return;
    }

    sira = (sira === "X") ? "O" : "X";
  });
});

function sonrakiTura(){
  setTimeout(function(){
    if (mevcutTur < toplamTur){
      mevcutTur++;
      tahtayiTemizle();
      skorGuncelle();
    } else {
      var sonuc;
      if (skorX > skorO) sonuc = "X";
      else if (skorO > skorX) sonuc = "O";
      else sonuc = "BERABERE";

      durumEl.textContent = "OYUN BİTTİ! Genel Kazanan: " + sonuc;
    }
  }, 1500);
}

