let requestAddTodoItem = function() {
  let objective = document.querySelector('.addTodoItem').value;
  let todoId = document.querySelector('.todo').id;
  if (!objective) return;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let itemObjective=document.createElement('p');
      itemObjective.innerText = objective;
      let deleteLink = document.createElement('a');
      deleteLink.href = `/todo/delete/${todoId}/${this.responseText.id}`
      deleteLink.innerText = 'Delete';
      document.querySelector('.todoItems').appendChild(itemObjective);
      document.querySelector('.todoItems').appendChild(deleteLink);
    }
  };
  xhttp.open("POST", `/todo/add/${todoId}`, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`objective=${objective}`);
}
