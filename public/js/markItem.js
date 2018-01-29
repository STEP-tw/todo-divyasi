let requestMarkAs = function (event) {
  let itemId=event.target.id;
  let status=event.target.checked;
  let todoId=document.querySelector('.todo').id;
  let xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange=function () {
    if (this.readyState == 4 && this.status == 200) {
      let checkBox=document.querySelector(`#checkBox${itemId}`)
      if (status){
        checkBox.checked=true;
      }else {
        checkBox.checked=false;
      }
    }
  }
  xhttp.open("POST",`/todo/mark/${todoId}/${itemId}`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`status=${status}`);
}
