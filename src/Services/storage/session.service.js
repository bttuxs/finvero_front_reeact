let instance;

class storage {
    nameSession = 'finvero'
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }

    instance = this;
  }

  getSession() {
    return JSON.parse(localStorage.getItem(this.nameSession));
  }

  setSession(dataSession) {
    localStorage.setItem(this.nameSession, dataSession);
  }

  validSession(){
    let dataSession = this.getSession();
    if(dataSession && dataSession.id){
        return true
    }
    return false
  }

  clearSession(){
    console.log("se limpia session")
    localStorage.clear()
  }

  sessionToken(){
    let dataSession = this.getSession();  
    return dataSession.access_token  
  }

}

let sessionStorage = Object.freeze(new storage());

export default sessionStorage;