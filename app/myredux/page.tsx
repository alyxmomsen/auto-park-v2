import React from 'react'
// import { SecondStore, Wrapper } from './_classes/MyRedux'

const page = () => {

    
    const arr = `
    Что вы узнаете об эффективности;
алгоритмов;
А теперь хорошая новость: скорее всего, реализация каждого алгоритма;
в этой книге уже доступна на вашем любимом языке программирования ивам;
не придется писать каждый алгоритм самостоятельно! Но любая реализация;
будет бесполезной, если вы не понимаете ее плюсов и минусов. В этой книге;
вы научитесь сравнивать сильные и слабые стороны разных алгоритмов:;
из каких соображений выбирать между сортировкой слиянием и быстрой;
сортировкой? Что использовать — массив или список? Даже выбор другой;
структуры данных может оказать сильное влияние на результат.;
Что вы узнаете о решении задач;
Вы освоите методы решения задач, которые вам сейчас, возможно, неиз-;
вестны. Примеры:;
 Если вы любите создавать видеоигры, вы можете написать систему на;
базе искусственного интеллекта, моделирующую действия пользователя;
с применением алгоритмов из теории графов.;
 Вы узнаете, как построить рекомендательну;`.split(';') ;

    return (
        <div>
            <h1>title</h1>
            <div>
                {
                    f00(arr).map(elem => <div>{ elem }</div>)
                }  
            </div>
        </div>
    )
}

export default page


function f00(arr:string[]): string[] {
    
    let unsortedarr = arr;
    const sortedArr:string[] = []

    
    while (unsortedarr.length) {
        
        let max: string | undefined = undefined;
        let index = Infinity;
        unsortedarr.forEach((elem , i) => {

            if (max === undefined) {
                max = elem;
                index = i;
            }
            else if (elem > max) {
                max = elem;
                index = i;
            }            
        });
        
        if (max) sortedArr.push(max);
        if (index !== Infinity) {
            unsortedarr.splice(index, 1);
        } 
    }

    
    return sortedArr;
}

abstract class Shape {
    protected width: number;
    protected height: number;
    abstract getQuad(): Quad;
    constructor(width:number , height:number) {
        this.width = width;
        this.height = height;
    }
}

class Quad extends Shape {
    getQuad(): Quad {
        return new Quad(100);
    }
    constructor(side:number) {
        super(side , side);
    }
}

class Square extends Shape {

    private copyOfThisShape: {width:number , height:number};

    getQuad(): Quad {
        if (this.copyOfThisShape.width <= this.copyOfThisShape.height) {
            this.copyOfThisShape = {width:this.copyOfThisShape.width - this.copyOfThisShape.width , height:this.copyOfThisShape.height};
            return new Quad(this.copyOfThisShape.width);
        }
        else {
            this.copyOfThisShape = {width:this.copyOfThisShape.width , height:this.copyOfThisShape.height - this.copyOfThisShape.height};
            return new Quad(this.copyOfThisShape.height);
        }
    }

    constructor(width:number , height:number) {
        super(width , height);
        this.copyOfThisShape = {width , height}
    }
}

const shape = new Square(100, 1000);

const arr: Quad[] = []

for (let i = 0; i < 100;i++){
    
    arr.push(shape.getQuad());
}

console.log(arr);
