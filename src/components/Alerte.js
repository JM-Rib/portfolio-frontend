import './Alerte.css';

/* Deux styleType: 
  succes
  erreur
*/
function Alerte(props) {
  	return (
      <div className="espaceAlerte" style={{ opacity: `${ props.flag ? '1' : '0'}` }} >
        { props.flag ?
          <div className={`label-warning ${props.styleType}`} >
            {props.children}
          </div>
        :
          null
        }
      </div>
    );
}

export default Alerte;