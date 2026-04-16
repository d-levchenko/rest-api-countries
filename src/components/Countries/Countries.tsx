// import css from './Countries.module.css';
import fetchCountries from '../../services/countryService';

const Countries = () => {
  console.log(fetchCountries());

  return <div>{/* <h1 className={css.container}>Countries</h1> */}</div>;
};

export default Countries;
