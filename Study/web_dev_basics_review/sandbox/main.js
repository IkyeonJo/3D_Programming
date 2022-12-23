const itemEls = document.querySelectorAll('.item');
const btnEl = document.querySelector('.btn');
const colors = ['royalblue', 'orange', 'tomato'];

btnEl.addEventListener('click', function(){
  itemEls.forEach(function(item, index){
  item.style.backgroundColor=colors[index];
  item.style.color = 'white';
  })
  btnEl.innerHTML = '<span>클릭했어요!</span>';
})

function hello(name) {
  if (name.length > 5) {
    return;
  }
  console.log(name)
}
