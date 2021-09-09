// ここから書いてください。
//to do
//右上のdesplayに右のボタンでクリックされた番号、商品名、値段が表示される

//productの状態を設定
class Product{
    constructor(name, price, imgUrl){
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
    }

    
}

//productのリストを受け取って、各プロダクトの番号・製品名・価格・画像のリストのリストを返す
//outputイメージ--->[[number1, name1, price1, img1],[number2, name2, price2, img2]]
function getProductInfo(productLists){
    let output = [];
    for (let i = 0; i < productLists.length; i++){
        let innerList = []
        innerList.push(i+1);
        innerList.push(productLists[i].name);
        innerList.push(productLists[i].price);
        innerList.push(productLists[i].imgUrl);
        output.push(innerList)
    }
    return output
}

//右半分
//productInfoを受け取って、ボタンを作成
function buttonCreator(productInfo){
    let outerDiv = document.getElementById("btnOuter");
    for (let i = 0; i < productInfo.length; i++){
        outerDiv.innerHTML += 
        `<button class="btn btn-outline-warning col-3 m-1 font-weight-bold" id="buttonElement">${productInfo[i][0]}</button>`
    }
    return outerDiv + "</div></div></div>"
}
 
//各ボタンに数字と製品情報を表示するイベントリスナーを追加
function display(productInfo){
    let btnEles = document.querySelectorAll('#buttonElement');
    for (let i = 0; i < btnEles.length; i++){
        btnEles[i].addEventListener("click", function(){
            let display = document.getElementById('numDisplay');
            display.innerHTML = "";
            display.innerHTML = productInfo[i][0];
            let name = document.getElementById('name');
            name.innerHTML = "";
            name.innerHTML = productInfo[i][1].toUpperCase();
            let price = document.getElementById('price');
            price.innerHTML = "";
            price.innerHTML = productInfo[i][2];
        })
    }
}

//左半分
//画像のストックdivを作成（d-none）し、mainDivに初期値を設定
//mainDivにdata-indexを付けて初期値を設定。出力は画像要素ノードのリスト
function addImgStock(productInfo){
    let outerDiv = document.getElementById("imgStock");
    for (let i = 0; i < productInfo.length; i++){
        outerDiv.innerHTML += `<img src="${productInfo[i][3]}" alt= "Responsive Image" class="w-100 h-100" id="imgItem">`
    }
    let main = document.getElementById('main');
    let imgItems = document.querySelectorAll("#imgItem");
    main.append(imgItems[0]);
    main.setAttribute("data-index", 0);
    return imgItems
}

//イベントリスナーの挙動
//要素のリストを受け取り、現在のimg、次のimgを、extra、mainにそれぞれ設定
function slider(imgItems){
    let btnEles = document.querySelectorAll('#buttonElement');
    for (let i = 0; i < btnEles.length; i++){
        btnEles[i].addEventListener("click", function(){
            let main = document.getElementById('main');
            
            let index = parseInt(main.getAttribute("data-index"));
            let currentItem = imgItems.item(index);

            nextItem = imgItems[i];
            let nextIndex = i;
            main.setAttribute("data-index", nextIndex.toString());
            if (index == nextIndex) return
            
            main.innerHTML = "";
            main.append(nextItem);

            let extra = document.getElementById('extra');
            extra.innerHTML = "";
            extra.append(currentItem);

            main.classList.add("expand-animation");
            extra.classList.add("deplete-animation");

            //スライドの方向を決定
            let sliderShow = document.getElementById('slider-show');
            sliderShow.innerHTML = "";
            if (nextIndex-index > 0){
                if ((nextIndex-index) < btnEles.length/2){
                    sliderShow.append(extra);
                    sliderShow.append(main);
                }else {
                    sliderShow.append(main);
                    sliderShow.append(extra);
                }
            } else if(nextIndex-index < 0){
                if ((index-nextIndex) < btnEles.length/2){
                    sliderShow.append(main);
                    sliderShow.append(extra);
                }else {
                    sliderShow.append(extra);
                    sliderShow.append(main);
                }
            }
        })
    }
}

//商品を入力
let product1 = new Product("cafelatte", "$4.50", 'https://almondhostelandcafe.tokyo/wp-content/uploads/2019/09/cafelatte.jpg');
let product2 = new Product("coffee", "$3.50", 'https://cdn.pixabay.com/photo/2017/03/13/12/34/coffee-2139592__480.jpg');
let product3 = new Product("cafemoca", "$5.50", 'https://cdn.pixabay.com/photo/2016/08/09/13/21/coffee-1580595__480.jpg');
let product4 = new Product("chocolate", "$2.50", 'https://cdn.pixabay.com/photo/2016/10/13/11/44/chocolates-1737503__340.jpg');
let product5 = new Product("espresso", "$3.50", 'https://cdn.pixabay.com/photo/2020/09/13/04/13/coffee-5567269__480.jpg');
let product6 = new Product("cocoa", "$3.00", 'https://cdn.pixabay.com/photo/2015/11/23/11/57/hot-chocolate-1058197__480.jpg');
let product7 = new Product("tea", "$3.50", 'https://cdn.pixabay.com/photo/2016/10/20/19/52/tee-1756497__480.jpg');
let productLists = [product1, product2, product3, product4, product5,product6, product7]
let info = getProductInfo(productLists)
//右半分の実装
console.log(buttonCreator(info));
console.log(display(info));

//スライダーの実装
imgItems = addImgStock(info);
//console.log(document.getElementById('main'));
console.log(slider(imgItems));