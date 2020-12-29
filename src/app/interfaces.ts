export interface userData{
    isLoggedIn : boolean,
    username : string,
    isEmployee : boolean
}

export interface odznaka {
    ID: number,
    Stopien : number,
    Pracownik_Referatu_Weryfikacyjnego : number,
    Data_przyznania : Date,
    Punkty_zdobyte: number,
    TurystaZdobywca : number,
    Zdobyta : boolean,
    Punkty_wymagane : number,
    CzyMala : boolean
}

export interface stopien {
    ID : number,
    Nazwa : string
}