
const ccColor1 = document.querySelector("#app > section > div.cc-bg > svg > g > g:nth-child(1) > path")
const ccColor2 = document.querySelector("#app > section > div.cc-bg > svg > g > g:nth-child(2) > path")
const ccIcone = document.querySelector("#app > section > div.cc-logo > span:nth-child(2) > img")
function modificaCcColor(cartao){
    const cores = {
      visa: ["#2D57F2", "#436D99"],
      mastercard: ["#DF6F29", "#C69347"],
      default: ["black", "gray"]
    } 
    ccColor1.setAttribute("fill", cores[cartao][0])
    ccColor2.setAttribute("fill", cores[cartao][1])
    ccIcone.setAttribute("src", `public/cc-${cartao}.svg`)

}
function modificaInfoCc(info, value){
  let divInfo = document.querySelector(`.cc-info .${info}`)
  divInfo.innerText = value 
  console.log(info);
}
modificaCcColor("default")
//validacao dos inputs
const data = new Date()
let anoMinimo = Number(String(data.getFullYear()).slice(2))
let anoLimite = anoMinimo += 10
 
const REGEXS = [
  {
    cartao: "visa",
      card_number: /^[4]\d{15}/,
      card_holder: /\D/,
      expiration_date: null,
      security_code: /[\d]{4}/
  },
  {
    cartao: "mastercard" ,
      card_number: /^[5]\d{15}/,
      card_holder: /\D/,
      expiration_date: null,
      security_code: /[\d]{4}/
  }
]


//recuperando os values dos inputs

const INPUTS = document.querySelectorAll("form input")
console.log(INPUTS);

INPUTS[0].addEventListener("keyup", ()=>{
  let id = INPUTS[0].id
  let value = INPUTS[0].value
  console.log(typeof value);
  for (let regex of REGEXS){
    if(regex.card_number.test(value)){
      console.log(regex.cartao);
      modificaCcColor(regex.cartao)
      modificaInfoCc("cc-number",value)
      break
    }
  }
})

INPUTS[1].addEventListener("keyup", ()=>{
  let value = INPUTS[1].value
  for(let regex of REGEXS){
    if(regex.card_holder.test(value)){
      modificaInfoCc("cc-holder",value.toUpperCase())
    }else{
      INPUTS[1].value = ""
    }
  }

})
INPUTS[2].addEventListener("keyup", ()=>{
  let value = INPUTS[2].value
  modificaInfoCc("cc-expiration .value", value)
})
INPUTS[3].addEventListener("keyup", ()=>{
  let value = INPUTS[3].value
  modificaInfoCc("cc-security .value", value)
})

