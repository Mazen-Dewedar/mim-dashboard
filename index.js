// let products =[]
// let productJ=JSON.stringify(products)
// localStorage.setItem('products',productJ)
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify([]));
}

let prodcutsFromLocal = localStorage.getItem('products')
let FinalProducts = JSON.parse(prodcutsFromLocal)
let table = document.querySelector('.container table tbody')
console.log(prodcutsFromLocal)
let productIndex=null;
let showProducts = () => {
  table.innerHTML = ''
  FinalProducts.forEach((el, index) => {
    let row = `
        <tr>
          <th>${index + 1}</th>
          <th>${el.name}</th>
          <th>${el.price}</th>
          <th>${el.qty}</th>
          <th>
          <div>
          <button class="btn btn-warning" onclick="editProduct(${index})">Edit</button>
          <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
          </div></th>
        </tr>
        `
    table.innerHTML += row
  });
}
showProducts();
let deleteProduct = (index) => {
  swal.fire({
    icon: "question",
    title: "Are you Sure you want to delete ?",
    text: "Notice that you can't return the product info after you delete it",
    confirmButtonText: "Yes",
    showCancelButton: true,
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      swal.fire({
        title: 'Deleted',
        icon: "success",
        text: "The product was deleted successfully"
      });
      FinalProducts.splice(index, 1)
      localStorage.setItem('products', JSON.stringify(FinalProducts))
      showProducts()
    }
  });
}

let modal = document.querySelector('.hbl')
let Name = document.querySelector('#name')
let Price = document.querySelector('#price')
let Qty = document.querySelector('#qty')
let openWindow = () => {
  modal.classList.replace('d-none', 'd-flex')
}
let closeWindow = () => {
  modal.classList.replace('d-flex', 'd-none')
}
let addPhone = () => {
  FinalProducts.push(
    {
      name: Name.value,
      price: +Price.value,
      qty: +Qty.value,
    }
  )
  Name.value = ''
  Price.value = ''
  Qty.value = ''
  swal.fire({
    title: 'Phone added',
    icon: "success",
    text: "The product was added successfully"
  });
  localStorage.setItem('products', JSON.stringify(FinalProducts))
  closeWindow();
  showProducts();
}




let Name2 = document.querySelector('#name2')
let Price2 = document.querySelector('#price2')
let Qty2 = document.querySelector('#qty2')
let edit = document.querySelector('.edit')

let closeWindow2 = () => {
  edit.classList.replace('d-flex', 'd-none')
}

let editProduct = (index) => {
  productIndex=index;
  edit.classList.replace('d-none', 'd-flex')
  let productWithIndex = FinalProducts[index];
  Name2.value = productWithIndex.name
  Price2.value = productWithIndex.price
  Qty2.value = productWithIndex.qty
}

let editPhone = () => {
  let productEdit=
    {
      name: Name2.value,
      price: +Price2.value,
      qty: +Qty2.value,
    }
    FinalProducts[productIndex]=productEdit;
    localStorage.setItem("products",JSON.stringify(FinalProducts))
    Name2.value='';
    Price2.value='';
    Qty2.value='';
    swal.fire({
      title: 'Phone edit',
      icon: "success",
      text: "The product was edited successfully"
    });
  closeWindow2();
  showProducts();
}