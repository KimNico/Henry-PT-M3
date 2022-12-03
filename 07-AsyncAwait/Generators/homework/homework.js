function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let num = 1

   if(max){
    while(num<=max){
      if(num %3 ===0 && num %5 ===0){
        yield 'Fizz Buzz'
        num++
      }else if(num %3 ===0){
        yield 'Fizz'
        num++
      }else if(num %5 ===0){
        yield 'Buzz'
        num++
      }else{
        yield num
        num++
      }
    }
   }else{
  while(true){
    if(num %3 ===0 && num %5 ===0){
      yield 'Fizz Buzz'
      num++
    }else if(num %3 ===0){
      yield 'Fizz'
      num++
    }else if(num %5 ===0){
      yield 'Buzz'
      num++
    }else{
      yield num
      num++
    }
  }
}
}
module.exports = fizzBuzzGenerator;