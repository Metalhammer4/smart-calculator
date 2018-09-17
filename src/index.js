class SmartCalculator {
  
  constructor(initialValue) {
      this.value = 0;
      this.priority = {'**':0, '*':1, '/':1, '+':2, '-':2}
      this.stack = [];
      this.operands = [initialValue];
  }

  fullStack(n) {
      if (this.stack.length == 0) return 0;
      if (this.priority[n] > this.priority[this.stack[this.stack.length - 1]]) {
          return -1;
      } if (this.priority[n] < this.priority[this.stack[this.stack.length-1]]) {
          return 1
      }
      return 0;
  }

  add(number) {
      while ((this.fullStack('+') != 1) && (this.stack.length != 0)) {
         this.operands.push(this.stack.pop());   
      }
      this.operands.push(number);
      this.stack.push('+'); 
      return this;
  }

  subtract(number) {
      while ((this.fullStack('-') != 1) && (this.stack.length != 0)) {
         this.operands.push(this.stack.pop());   
      }
      this.operands.push(number);
      this.stack.push('-');
      return this;
  }

  multiply(number) {
      while ((this.fullStack('*') != 1) && (this.stack.length != 0)) {
         this.operands.push(this.stack.pop());   
      }
      this.operands.push(number);
      this.stack.push('*'); 
      return this;
  }

  devide(number) {
      while ((this.fullStack('/') != 1) && (this.stack.length != 0)){
         this.operands.push(this.stack.pop());   
      }
      this.operands.push(number);
      this.stack.push('/'); 
      return this;
  }

  pow(number) {
      while ((this.fullStack('**') == -1) && (this.stack.length != 0)) { 
         this.operands.push(this.stack.pop());  
      }
      this.operands.push(number);
      this.stack.push('**'); 
      return this;
  }

  calc(stackCalc) {
      let operator = stackCalc.pop();
      let y  = stackCalc.pop();
      let x  = stackCalc.pop();
      switch(operator) {
          case "**":
              x **= y; break;
          case "*":
              x *= y;  break;
          case "/":
              x /= y;  break;
          case "+": 
              x += y;  break;
          case "-":
              x -= y;  break;
          default:
              console.log(`ERROR ${operator}`)
              break;  
      }
      stackCalc.push(x);
  }

  calculate(stackCalc) {
    let temp = [];
      while(stackCalc.length != 0) { 
          
          temp.push(stackCalc.shift());
          
          switch(temp[temp.length - 1]) {
              case "**":
              case "*" :
              case "/" :
              case "+" : 
              case "-" :
                  this.calc(temp);
                  break;
              default:
                  break;
          }   
      }
      return temp[0];
  }

  valueOf() {
      let s = Array(...this.stack);   
      let o = Array(...this.operands);
      while (s.length > 0) {
          o.push(s.pop());          
      } 
      this.value = this.calculate(o); 
      return this.value;
  }
}

module.exports = SmartCalculator;