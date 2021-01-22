const $siteList=$('.siteList')
const $lastLi=$siteList.find('li.last')
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)
const hashMap= xObject ||[
  {logo:'A',url:'https://www.angularjs.net.cn'},
  {logo:'B',url:'https://www.bilibili.com/'},
  {logo:'C',url:'https://www.csdn.net/'}
]
const simplifyUrl=(url)=>{
  return url.replace('https://','')
  .replace('http://','')
  .replace('www.','')//只会不显示，但是不会删除
  .replace(/\/.*/,'')//删出/开头的内容
}

const render=()=>{
  $siteList.find('li:not(.last)').remove()
hashMap.forEach((node,index)=>{//.toUpperCase()是可以把小写字母转换成大写字母

    const $li=$(`<li>
 
   <div class="site">
     <div class="logo"> ${simplifyUrl(node.url)[0].toUpperCase()}</div>
     <div class="link">${simplifyUrl(node.url)}</div>
     <div class="close">
       <svg class="icon" >
       <use xlink:href="#icon-close"></use>
       </svg>
     </div>
   </div>

</li>`).insertBefore($lastLi)
$li.on('click',()=>{
    window.open(node.url)
})
$li.on('click','.close',(e)=>{
    e.stopPropagation()
    console.log(hashMap)
    hashMap.splice(index,1)
    render()
})
})
}
render()
$('.addButtom')
.on('click',()=>{
  let url=window.prompt('请问您要添加的网站地址是什么呢？')
  if(url.indexOf('http')!==0){
       url='https://'+url
  }
  console.log(url)
  hashMap.push({logo:simplifyUrl(url[0]),url:url})
  
render()
})
 window.onbeforeunload=()=>{
    
     const string=JSON.stringify(hashMap)//把localstrage（只能使用字符串进行存储）变成字符串
     localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
  const key=e.key//可以简写：const{key}=e
  for(let i=0;i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase()===key){
      window.open(hashMap[i].url)
     console.log(hashMap[i].url)
    }
  }
})
