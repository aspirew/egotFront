export interface status{
    success : boolean,
    message : string
}

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

export interface punkt {
    ID : number,
    Nazwa : string,
    Pracownik_PTTK : number,
    Wysokosc_npm : number
}

export interface teren {
    ID : number,
    Nazwa : string,
    Pasmo_gorskie : number
}

export interface odcinek {
    ID : number,
    Nazwa : string,
    PunktPoczatkowy : number,
    PunktKoncowy : number,
    Teren : number,
    Dlugosc : number,
    Punktacja : number,
    PunktacjaOdKonca : number
}

export interface odcinekHR {
    ID : number,
    Nazwa : string,
    PunktPoczatkowy : number,
    PPNazwa : string,
    PunktKoncowy : number,
    PKNazwa : string,
    Teren : number,
    TerenNazwa : string,
    Dlugos : number,
    Punktacja : number,
    PunktacjaOdKonca : number
}

export interface badgeWays {
    Data : Date,
    Zdobyte : number,
    Nadmiar : number,
    Przyznane : number
}

export interface simplePrzejscieOdcinkaExtended {
    Odcinek : odcinekHR,
    Od_konca : boolean
}

export interface simplePrzejscieOdcinka {
    Odcinek : number,
    Od_konca : boolean
}