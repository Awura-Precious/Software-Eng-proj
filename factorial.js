/*-------Tail factorisation:-------*/
const tailFactorial = (num, a) => {


    if ((num == 0) || (num == 1)) {
        return a
    }

    else {
        return tailFactorial(num - 1, a * num) //tail factorisation
    }

}


/*-------------head factorisation-----------*/
const factorial = (num) => {
    if ((num == 0) || (num == 1)) {
        return 1;
    }
    else {
        return num * (factorial(num - 1))//leading to stack overflow for large numbers
    }
}