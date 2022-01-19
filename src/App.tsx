import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
const Country = (props : any) => {
  return (
    <li className="country">
      <p>{props.country}</p>
      <p>{props.population}</p>
    </li>
  );
};
export default function App() {
  const [countries, setCountries] = useState<any>([]);
  const [capitals, setCapiltals] = useState<any>([]);
  const [population, setPopulation] = useState<any>([]);
  const [newArray, setNewArray] = useState<any>([]);
  const [newArrayAscending, setNewArrayAscending] = useState<any>([]);

  const[ascend, setAscend] = useState(false);
  const[descend, setDescend] = useState(false);



  useEffect(() => {
    let country : any =[];
    Promise.all([
      axios.get("https://restcountries.com/v3.1/all?fields=capital,population"),
      axios
      .get("https://restcountries.com/v3.1/all?fields=capital,name")
  ])
  .then((values)=>{
    // console.log(values)
    const population :any = values[0].data;
    // console.log(population)
    const country : any = values[1].data;
    // console.log(country)
           const initArray : any = [];
          country.forEach((item : any, index : number) => {
            const payload = {
              country: item.name.common,
              population: population[index].population
            };
            initArray[index] = payload;
          });
          initArray.sort((a : any, b : any) => {
            if (a.population > b.population) {
              return -1;
            } else if (a.population < b.population) {
              return 1;
            } else {
              return 0;
            }
          });
          const ascendArray  = [...initArray];

          ascendArray.sort((a : any, b : any) => {
            if (a.population > b.population) {
              return 1;
            } else if (a.population < b.population) {
              return -1;
            } else {
              return 0;
            }
          });
          setNewArray(initArray)

          setNewArrayAscending(ascendArray)
          console.log('NEW', ascendArray)
  })
  .catch((err)=> {

  })
    
    return () => {
      setCountries([]);
      setPopulation([]);
      setNewArray([]);
    };
  }, []);
  return (
    <div className="App">
      <button onClick={()=> setAscend((pre)=> !pre)}  > assend </button>
      <button  onClick={()=> setDescend((pre)=> !pre)} > descend </button>

      ({(newArrayAscending.length > 0 && ascend) && (
        <ul>
          {newArrayAscending.map((item : any, index : any) => (
            <Country
              key={item.country}
              country={item.country}
              population={item.population}
            />
          ))}
        </ul>
      )}
      {(newArray.length > 0 && descend) && (
        <ul>
          {newArray.map((item : any, index : any) => (
            <Country
              key={item.country}
              country={item.country}
              population={item.population}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
