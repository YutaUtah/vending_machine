//右上のdesplayに右のボタンでクリックされた番号、商品名、値段が表示される
//productの状態を設定
class Product {
    constructor(name, price, imgUrl){
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
    }
}

let product1 = new Product("cafelatte", "$4.50", 'images/beer_garden.jpeg');
let product2 = new Product("cafelatte", "$4.50", 'images/birthday-surprise.jpeg');
let product3 = new Product("cafelatte", "$4.50", 'images/rainy_tokyo_station.png');
let product4 = new Product("cafelatte", "$4.50", 'images/sexy_kristen.png');
let product5 = new Product("cafelatte", "$4.50", 'images/yushima-tenmangu.jpeg');

const productList = [product1, product2, product3, product4, product5]

//productのリストを受け取って、各プロダクトの番号・製品名・価格・画像のリストのリストを返す
//outputイメージ--->[[number1, name1, price1, img1],[number2, name2, price2, img2]]
function getProductInfo(productList){
    let output = [];
    for (let i = 0; i < productList.length; i++){
        let innerList = []
        innerList.push(i+1);
        innerList.push(productList[i].name);
        innerList.push(productList[i].price);
        innerList.push(productList[i].imgUrl);
        output.push(innerList)
    }
    return output
}

function showProductInfo(productList, productIndex){
    infoList = getProductInfo(productList)
    return infoList[productIndex-1][3]
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

function createButton(){
    let allBtnDiv = document.getElementById("allBtnDiv");
    let btnList = ["1","2","3","4","5","6","7","8","9","C","0","←"];

    for (let i=0; i < btnList.length; i++){
        // create div and idName(button1, button4 etc...)
        let eachBtnElement = document.createElement("div");
        eachBtnElement.classList.add("col-4", "text-center", "py-2");
        if (btnList[i] === "←"){
            let idName = "buttonGoBack";
            eachBtnElement.setAttribute("id", idName);
        }
        else{
            let idName = "button" + btnList[i];
            // setting id attribute i.e. id=button1 etc...
            eachBtnElement.setAttribute("id", idName);
        }

        let actualBtnElement = document.createElement("button")
        actualBtnElement.classList.add("btn", "btn-primary")
        actualBtnElement.innerHTML = btnList[i]
        let clickFunction = "selectNumber(" + btnList[i] + ")";
        if (btnList[i] === "C"){
            clickFunction = "acClear()"
        }
        else if (btnList[i] === "←"){
            clickFunction = "goBack()"
        }
        actualBtnElement.setAttribute("onclick",clickFunction);

        eachBtnElement.append(actualBtnElement)
        allBtnDiv.append(eachBtnElement);
    }
}

createButton();

function selectNumber(num){
    pictureFrameElement = document.getElementById("pic-screen")
    pictureElement = document.createElement("img")
    pictureElement.src = showProductInfo(productList, num)
    pictureFrameElement.appendChild(pictureElement)
}

