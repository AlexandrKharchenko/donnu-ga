debug = true;

if (debug) console.log('Start app');





var GA_CHART  = Highcharts.chart('container', {
    chart: {
        type: 'spline',
    },
    boost: {
        useGPUTranslations: true
    },
    title: {
        text: 'Lab 1'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        title: {
            text: 'X'
        }
    },
    yAxis: {
        title: {
            text: 'Y',
            
        },
        min: -20,
        max: 20
    },
    

    plotOptions: {
        series: {
            pointStart: -10
        }
    },
    series: [
	    {
	    	type: 'spline',
	        name: 'Function chart',
	        data: []
	    }
    ]
});






var Lab12 = function(chart){
    
        this.chart = chart;
    
        this.chartInitData = [];
        
        this.f = [];
        
        // Размер популяции
        this.sizePopulation;
    
        // Моя функция 
        this.func = function (x) {
            return  (1.85  - x) * Math.cos(3.5 * x - 0.5);
        }

        this.drowChart = function(){

            for (var x = -10; x <= 10; x += 0.2) {
                let y = this.func(x);
                let chartPoint = {
                    x: x,
                    y: y
                };
                this.chartInitData.push(chartPoint);
                
                
            }
            // this.chart.series[0].addPoint(chartPoint);
            this.chart.series[0].setData(this.chartInitData);
            //this.chartInitData.forEach((el, index) => {
            //    this.chart.series[0].addPoint(el.y);
            //});

        }

        // Мутация
        // Передать число потомок и изменить на чуть чуть птомок +  random(-1, 1) * потомок / 1000 (100)
        this.mutation = function(val)  // мутация: генерация случайной величины
        {
          return val - this.generateRandom(-1, 1) * val / 2000;
        }

        
        // Сортировка
        this.sort = function(x, y)  // сортировка
        {
            for (let i = 0; i < this.sizePopulation; i++) {
                for (let j = i + 1; j < this.sizePopulation; j++) {
                    
                    if (Math.abs(this.population[j]) > Math.abs(this.population[i])) {
                        temp = this.population[i];
                        this.population[i] = this.population[j];
                        this.population[j] = temp;
                        temp = this.f[i];
                        this.f[i] = this.f[j];
                        this.f[j] = temp;
                    }
                }
            }
        }
        
        // AVG для Х чтобы взять за основу нового поколения
        this.crossover = function(bestParents) {
            let avgX = 0;

            bestParents.forEach((el) => {
                avgX += el.x;
            });

            avgX = parseFloat(avgX / bestParents.length);
            console.log('avg' , avgX);

            return avgX;

        }

        // Генерация случайного числа
        this.generateRandom = function (min , max) {
            return min + Math.random() * (max + 1 - min);
        }

        // Популяци значения это сгенерированые Х
        this.population = [];

        // Значения целейвой функции
        this.functionValues = [];

        //

        this.generateChildren = function(parentValue , amount){
            let childrenNew = [];
            for(let i = 0; i < amount; i++){
                let generatedX = this.mutation(parentValue); 

                childrenNew.push({
                    x: generatedX,
                    y: this.func(generatedX),
                });

            }
            return childrenNew;
            console.log('ch population' , childrenNew);
        }

        this.genetic = function(x0 , x1 , eps , sizePopulation) {
            this.sizePopulation = sizePopulation;
            this.drowChart();

            // 1. Первая популяция массив из диапозона -10 10
            // 2. CСчитаю значение фитнес функ это значения Y = (х), х - сгенерировал случайно образом !!! Популяция
            // 3. Вывожу точки где коорд 1 - 2 пункт x - 1 ; y -2

            // 4. Выбрать родительские особи / допустим 4 шт ... в каких Х макс Y (целевая функция)

            // 5. Скрещевание и потомки в след. массив Задать кол-во потомков

            // 6. Сокращение промеж. популяции (Объеденить два массива родители + потомки) как миксовать почитать 3 тема

            // Повторять 3 - 6 пункт

            // 
            for (let i = 0; i < sizePopulation; i++)   // Формирование начальной популяции
            {
              let generatedX = this.mutation(this.generateRandom(-10 , 10)); // Генерация  
              this.population[i] = {
                  x: generatedX,
                  y: this.func(generatedX),
              }
              
            }

          

            GA_CHART.addSeries({
                type: 'scatter',
            });

            // Вывод первой популяции рандомной
            setTimeout(() => {
                this.population.forEach((el) => {
                    this.chart.series[1].addPoint(el);
                });
    
            } , 1000)


            
            

            // Повторять 3 - 6 шаг
            let amountPopulation = 40;
            let numberPopulation = 0;
            

            
         
            let populationTimeOut = setInterval(() => {

                if(numberPopulation >= amountPopulation){
                    clearInterval(populationTimeOut);
                    console.log('clear');
                    return false;
                }

                
                this.chart.series[1].setData([]);
                

                console.log('Go' , numberPopulation);
                // Отсортировать популяцию для 4 пункта первыми идут самые большие Y
                this.population.sort((a , b) => {
                    return parseFloat(b.y) - parseFloat(a.y);
                });

                // Возьмем 4 лучших особи
                let bestParents = this.population.slice(0 , 4);
                console.log('bestParents' , bestParents);

                // Запустим кроссовер - среднее из лучших родителей
                let parentForChildrens = this.crossover(bestParents);
                console.log('parentForChildrens' , parentForChildrens);
                
                // Сгенерируем потомков на основе лучшего родителя
                let chPopulation = this.generateChildren(parentForChildrens , 30);
                console.log('chP' , chPopulation)
          
                // Мутирую лучшего предка и добавлю к детям
                let genMutationParentX = this.mutation(bestParents[0].x);
                let bestParent = {
                    x: genMutationParentX,
                    y: this.func(genMutationParentX)
                };
                this.population = chPopulation.concat([bestParent]);

                
                this.chart.series[1].setData(this.population);
                
                
                numberPopulation++;
                console.log('Go' , numberPopulation);
                
                    

            }, 250);
            
            
            console.log('population' , this.population);

            

            
        }
    
    
    
    }

var GA = new Lab12(GA_CHART);

GA.genetic(-10, 10 , 0.0001 , 70);


//GA_CHART.series.addPoint();