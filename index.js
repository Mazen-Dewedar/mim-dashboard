// let products=[
//   {
//     name:'iphone x',
//     price:1200,
//     qty:3
//   }
// ]
// let productsJ=JSON.stringify(products);
// localStorage.setItem('products',productsJ)


let prodcutsFromLocal = localStorage.getItem('products')
let FinalProducts = JSON.parse(prodcutsFromLocal)
let table = document.querySelector('.container table tbody')
console.log(prodcutsFromLocal)
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

