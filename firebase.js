console.log("x");
var firebaseConfig = {
    apiKey: "AIzaSyAyS0uxlDM8I_-nWUvWWTtfLvlRdJnmLrI",
    authDomain: "online-ar-pottery.firebaseapp.com",
    projectId: "online-ar-pottery",
    storageBucket: "online-ar-pottery.appspot.com",
    messagingSenderId: "738430154281",
    appId: "1:738430154281:web:8d6ed1280a0b3787dd0e38",
    measurementId: "G-8T6HT09WWH"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function addproduct(){
    var productId = document.getElementById("product-id").value;
    var productName = document.getElementById("product-name").value;
    var productPrice = document.getElementById("product-price").value;
    var productCategory = document.getElementById("product-category").value;
    var productSize = document.getElementById("product-size").value;
    var productQuantity = document.getElementById("quantity").value;
    
    var uploadTask = firebase.storage().ref('images/'+productName).put(files[0]);
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTranffered/snapshot.totalBytes)*100;
        console.log("Uploading: "+progress+ "%");
    },
    function(error){
        console.log('Upload image failed');
    },
    function (){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            imgUrl = url;
        });
    }
    )

    saveProduct(productId, productName, productPrice, productCategory, productSize, productQuantity, imgUrl);
    window.alert("Product added");
}

function saveProduct(id, name, price, category, size, quantity, imgLink){

    firebase.database().ref('product/'+id).set({
        Pname: name,
        Pprice: price,
        Pcategory: category,
        Psize: size,
        Pquantity: quantity,
        Pimage: imgLink
    });
}

var imgName, imgUrl;
var files = [];
var reader;

function uploadImg(e){
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function(){
            document.getElementById("product-img").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

function search(){
    var productId = document.getElementById("product-id").value;
    firebase.database().ref('product/'+productId).on('value',function(snapshot){
        document.getElementById("product-name").value = snapshot.val().Pname;
        document.getElementById("product-price").value = snapshot.val().Pprice;
        document.getElementById("product-category").value = snapshot.val().Pcategory;
        document.getElementById("product-size").value = snapshot.val().Psize;
        document.getElementById("quantity").value = snapshot.val().Pquantity;
        document.getElementById("product-img").src = snapshot.val().Pimage;
    });
}

function edit(){
    var productId = document.getElementById("product-id").value;
    var productName = document.getElementById("product-name").value;
    var productPrice = document.getElementById("product-price").value;
    var productCategory = document.getElementById("product-category").value;
    var productSize = document.getElementById("product-size").value;
    var productQuantity = document.getElementById("quantity").value;

    var uploadTask = firebase.storage().ref('images/'+productName).put(files[0]);
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTranffered/snapshot.totalBytes)*100;
        console.log("Uploading: "+progress+ "%");
    },
    function(error){
        console.log('Upload image failed');
    },
    function (){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            imgUrl = url;
        });
    }
    )

    firebase.database().ref('product/'+productId).update({
        Pname: productName,
        Pprice: productPrice,
        Pcategory: productCategory,
        Psize: productSize,
        Pquantity: productQuantity,
        Pimage: imgUrl
    })
    window.alert("Saved!");
}

function deleteProduct(){
    var productId = document.getElementById("product-id").value;
    firebase.database().ref('product/'+productId).remove();
    window.alert("Product deleted!");
}

function confirmOrder(){
    var cusName = document.getElementById("order-name").value;
    var cusAddress = document.getElementById("order-address").value;
    var cusEmail = document.getElementById("order-email").value;
    var cusPhone = document.getElementById("order-phone").value;

    const autoID = firebase.database().ref('order').push().key;
    firebase.database().ref('order/').child(autoID).set({
        CustomerName: cusName,
        CustomerAddress: cusAddress,
        CustomerEmail: cusEmail,
        CustomerPhone: cusPhone,
    });
    window.alert("Your order has been recorded!");
}

// Homepage
    



