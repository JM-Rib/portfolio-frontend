

export const convertDateSql  = (date) => {
  let jour = ("0" + date.getDate()).slice(-2);
  let mois = ("0" + (date.getMonth() + 1)).slice(-2);
  let annee = date.getFullYear();
  return (""+annee + "-" + mois + "-" + jour);
}

export const convertDateHuman = (date) => {
    let jour = ("0" + date.getDate()).slice(-2);
    let mois = ("0" + (date.getMonth() + 1)).slice(-2);
    let annee = date.getFullYear();
    return (""+jour + "/" + mois + "/" + annee);
};