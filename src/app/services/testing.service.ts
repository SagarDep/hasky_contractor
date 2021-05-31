import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RootObject } from "../interfaces/interface";
import { Respuesta } from "../interfaces/contractor";
import { token } from '../interfaces/login';
import { Break } from "../interfaces/break_times";
import { Projects } from "../interfaces/resultNewProject";
import { Projectss } from "../interfaces/projects";
import { Code } from "../interfaces/code";
import { SignUp } from "../interfaces/signup";
import { Update_project} from "../interfaces/update_projects";
import { ResendCode } from "../interfaces/resendcode";
import { Company } from "../interfaces/company";
import { User } from "../interfaces/user";
import { EditCompany } from '../interfaces/editCompany';
import { editUser } from '../interfaces/editUser';
import { deleteProject } from '../interfaces/deleteProjects';
import { Trades } from "../interfaces/trades";
import { PriceTrades } from '../interfaces/priceTrade';
import { Email } from '../interfaces/emial';
import { AddWorker } from '../interfaces/addworker';
import { GetProject } from '../interfaces/getProject';
import { Requestworker } from '../interfaces/requestorker';
import { Document } from '../interfaces/addDocument';
import { UserWorker, DetailRequest } from '../interfaces/detailRequest';
import { AcceptWorker } from '../interfaces/acceptorker';
import { getWorkers } from '../interfaces/getworkers';
import { getCompany } from '../interfaces/getCompany';
import { GetWorkersDetails } from '../interfaces/getWorkersDetails';
import { Notifiacions } from '../interfaces/notifications';
import { MarkNotifications } from '../interfaces/markNotifications';
import { References } from '../interfaces/references';
import * as moment from 'moment-timezone';



@Injectable({
  providedIn: "root"
})
export class TestingService {
  //url = "http://api.araconsultoriaydesarrollos.com/";
  url = "http://165.227.214.208/"; //"https://api.haskyconnections.com/";
  constructor(private http: HttpClient) {}
  error = "error";
  getAbilities() {
    return this.http.get<RootObject>(
      `https://pokeapi.co/api/v2/pokemon/ditto/`
    );
  }
  //obtiene los datos del usuario enviando token
  getContractor() {
    let axiosConfig = {
      headers: { 
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZhYTg5YzkyOTMxOTk5YzQ5Zjg0MzE5OWY3NzJmOGNjMDk3MTlkYmYzNmU0ZDRiNjQ0NzY4M2UxNDhjMDU3ZDgwZWQ2NmI3YWM3Yjc0MjQyIn0.eyJhdWQiOiIxIiwianRpIjoiNmFhODljOTI5MzE5OTljNDlmODQzMTk5Zjc3MmY4Y2MwOTcxOWRiZjM2ZTRkNGI2NDQ3NjgzZTE0OGMwNTdkODBlZDY2YjdhYzdiNzQyNDIiLCJpYXQiOjE1Njc4MTQ2MjQsIm5iZiI6MTU2NzgxNDYyNCwiZXhwIjoxNTk5NDM3MDI0LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.ZbOH1PVC4JTPfAxO-ZCGf6qLTiAe4Ilid3_2Od_ZjxJhCu71_vZw0jmnpUH2Fa2CF3oaO0ANk0XYQ6RP0OAA-iLdtkHHKVwYFkstBKy7mRdmjgnZH3BwPf8JnXsrmxyulTsouwXEIMgFdOuNnasVHOXRtqq3u4onua1ERNRBusdc0uyqI0a_4dUOkcQdiKLmOtwZGis-etTJdaTBhdWQFp8cDsfDH3WOK6f_KY9Y3T0SVo4rF99XGMKFLfEmsX_Qx6kYNzs4YDF-0E6FQV4uPSzm9Sa-a7EEL5ZR2Sn0jNj8JKmfQ8dYgs_c20p1HCtbGnknG-n3ele30gKBYWJASzVQJzdf9pg1r8NyabdZ5ovAmCHUQYixhpG75cP0L3IN-6r3_fIugs5niMeDxMz-rv5ZkLwPJp3cqkzggNwg4meqvwz0quX91AkKjD51tpxOgO0zjOZKs8pl4NpCald1I4BuR8hN-USRE1Zasvb5ko3Z58ddgcpVURlib8xxp4WOqihcY3-F6C43aU1-M_CjnqtKl8ineaz1xo9eM8pZaorYp4Rzru1pRmOw1jq0WHSXGnOyovzmWPDrhIAHac7poiuNIJPdl7fvFPlPxWHMiYTkaIveSVfEchH1Zpw2pR_rFYEXSrKmn4z76m93b_wRhMQdeAOqxkV1O6hZWz6BOC0"
      }
    };
    return this.http.get<Respuesta>(
      `${this.url}auth/user`,
      axiosConfig
    );
  }
  /// login recibe los datos 
  Login(email, password) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    let timezone = moment.tz.guess(true);
    return this.http.post<token>(
      `${this.url}auth/login`,
      {
        email: email,
        password: password,
        timezone
      },
      axiosConfig
    );
  }
  singup(firstname, lastname, email, password, passwordr, phone) {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    let timezone = moment.tz.guess(true);
   return this.http
      .post<SignUp>(
        `${this.url}auth/signup`,
        {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
          password_confirmation: passwordr,
          phone_number: phone,
          timezone
        },
        axiosConfig
      );
  }
  getBreakTimes(token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
   return this.http.get<Break>(`${this.url}break-times`, axiosConfig);
  }
//////////METHODS PROJECT////////////
  saveProject(data, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<Projects>(`${this.url}auth/projects/store`, {
      name: data.name,
      address: data.address,
      supervisor_name: data.supervisor_name,
      supervisor_phone: data.supervisor_phone,
      description: data.description,
      break_time: data.break_time,
      paid_break_time: data.paid_break_time,
      overtime: data.overtime,
      user_id: data.user_id,
      typeProject: data.typeProject
    }, axiosConfig);
    //console.log({name: data.name })
  }

  
  getProjects(token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
   return this.http.get<Projectss>(`${this.url}auth/project/contractor`, axiosConfig);
  }
  getProject(idProject,token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
   return this.http.get<GetProject>(`${this.url}auth/project/${idProject}`, axiosConfig);
  }

  updateProject(data, token, idUser,  Idproject){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.put<Update_project>(`${this.url}auth/projects/${Idproject}`, {
      name: data.name,
      address: data.address,
      supervisor_name: data.supervisor_name,
      supervisor_phone: data.supervisor_phone,
      description: data.description,
      break_time: data.break_time,
      paid_break_time: data.paid_break_time,
      overtime: data.overtime,
      user_id: idUser
    }, axiosConfig); 
    /**/
  }
  deleteProjects(token, id){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.delete<deleteProject>(`${this.url}auth/projects/${id}`, axiosConfig);
  }
  acivateProjects(token, id){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<deleteProject>(`${this.url}auth/projects/active`,{
      project_id: id
    }, axiosConfig);
  }
  doneProjects(token, id){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<deleteProject>(`${this.url}auth/projects/done`,{
      project_id: id
    }, axiosConfig);
  }



///////////////////////////////////////////////

  verifyCode(token, code){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<Code>(`${this.url}auth/user/code`, {
      code: code
    }, axiosConfig);
  }

  resenCode(token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.get<ResendCode>(`${this.url}auth/user/send-code`, axiosConfig);
  }

  addCompany(data, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<Company>(`${this.url}auth/companies/store`, {
        name: data.name,
        description: data.description,
        user_id: data.user_id
    }, axiosConfig)
  }
  addCompanyInUser(data, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<Company>(`${this.url}auth/companies/store`, {
      user_id: data.user_id,
      name: data.name,
      description: data.description,
      phone_number: data.phone_number,
      address: data.address,
      email: data.email,
      rfc: data.rfc,
      rs: data.rs
    }, axiosConfig)
  }
  ediCompany(data, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<EditCompany>(`${this.url}auth/companies/update`, {
        company_id: data.company_id,
        name: data.name,
        description: data.description,
        phone_number: data.phone_number,
        address: data.address,
        email: data.email,
        rfc: data.rfc,
        rs: data.rs
    }, axiosConfig)
  }
  ediCompanyImage(data, token){
    let fb = new FormData();
    //fb.append('user_id', data.user_id);
    fb.append('company_id', data.company_id);
    fb.append('image', data.file);
    let axiosConfig = {
      headers: {
        "Accept": "application/json",
        "site": "worker",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<EditCompany>(`${this.url}auth/companies/update`,fb,axiosConfig);
  }
  getUser(token, id){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.get<User>(`${this.url}auth/user/${id}`, axiosConfig)
  }
  editUser(data, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.put<editUser>(`${this.url}auth/user/${data.id}`, {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      location: data.location
    }, axiosConfig)
  }
  editUserSignal(data, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.put<editUser>(`${this.url}auth/user/${data.id}`, {
      onesignal_id: data.onesignal_id
    }, axiosConfig)
  }
  ediEstep(token, id){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.put<editUser>(`${this.url}auth/user/${id}`, {
      steps: "3"
    }, axiosConfig)
  }
  getTrades(){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    return this.http.get<Trades>(`${this.url}trades`, axiosConfig);
  }
  priceTrades(tradeid, type){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    return this.http.get<PriceTrades>(`${this.url}trade-prices?trade_id=${tradeid}&type=${type}`, axiosConfig);
  }
  uploadPicturePerfil(data, token){
    let fb = new FormData();
    //fb.append('user_id', data.user_id);
    fb.append('profile_image', data.file);
    let axiosConfig = {
      headers: {
        "Accept": "application/json",
        "site": "worker",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<Document>(`${this.url}auth/user/edit-profile`,fb,axiosConfig);
  }
  sendEmail(email){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    return this.http.post<Email>(`${this.url}send-email`, {
      email: email
    }, axiosConfig);
  }
  changePassoword(data){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    return this.http.post<Email>(`${this.url}send-password`, {
      code: data.code,
      email: data.email,
      password: data.password
    }, axiosConfig);
  }
  addRequestorker(data, token){

    let fb = new FormData();
    fb.append('trade_id', "2");
    fb.append('experience', data.experience);
    fb.append('quantity_workers', data.quantity_workers);
    fb.append('start_date', data.start_date);
    fb.append('end_date', data.end_date);
    fb.append('weekdays', data.weekdays);
    fb.append('cost', data.cost);
    fb.append('start_time',data.start_time);
    fb.append('end_time', data.end_time);
    fb.append('project_id', data.project_id);
    fb.append('task', data.task);

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<AddWorker>(`${this.url}auth/request-workers/store`, {
      trade_id: data.trade_id,
      experience: data.experience,
      quantity_workers: data.quantity_workers,
      start_date: data.start_date,
      end_date: data.end_date,
      weekdays: data.weekdays,
      cost: data.cost,
      start_time: data.start_time,
      end_time: data.end_time,
      project_id: data.project_id,
      task: data.task
    } , axiosConfig)
  }

  getRequesWorker(id, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };

    return this.http.post<Requestworker>(`${this.url}auth/get-request-data`, 
    {
      request_id: id
    }
    ,axiosConfig);

  }
  addDocumentd(data, token){
    let fb = new FormData();
    fb.append('user_id', data.user_id);
    fb.append('file', data.file);
    let axiosConfig = {
      headers: {
        "Accept": "application/json",
        "site": "worker",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<Document>(`${this.url}auth/user/document`,fb,axiosConfig);
  }

  //devuelve los usuarios interesados
  detailTradeWorkers(idRequest, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<getWorkers>(`${this.url}auth/get-request-data`, {
      request_id: idRequest
    }, axiosConfig);
  }
  getWorkerDetails(idRequest, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<GetWorkersDetails>(`${this.url}request-workers/get-workers`, {
      request_id: idRequest
    }, axiosConfig);
  }

  acceptWorker(idUser, idRequest, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<AcceptWorker>(`${this.url}auth/request-worker/acepted`, {
      user_id: idUser,
      request_id: idRequest
    }, axiosConfig);
  }
  deleteRequestWorket(idRequest, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    try{
      return this.http.post<Code>(`${this.url}auth/change-status-request`,{
        request_id: idRequest,
        status: "canceled"
      } , axiosConfig);
    }catch(error){
      console.log(error);
    }
  }
  cancelWorker(idUser, idRequest, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<AcceptWorker>(`${this.url}auth/request-worker/canceled`, {
      user_id: idUser,
      request_id: idRequest
    }, axiosConfig);
  }
  getCompany(idCompany, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.get<getCompany>(`${this.url}auth/companies/${idCompany}`, axiosConfig)
  }
  chekIn(data, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "admin",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    try{
      return this.http.post<Code>(`${this.url}auth/checkin/store`,{
        user_id: data.user_id,
        project_id: data.project_id,
        request_id: data.request_id,
        date: data.date,
        time: data.time
      }, axiosConfig)
    }catch(err){
        console.log(err)
    }
  }  
  Notifiacions(token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "worker",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    try{
    return this.http.get<Notifiacions>(`${this.url}auth/get-notifications`, axiosConfig);
   }catch(error){
     console.log(error)
   } 
  }
  markAsNotification(token){
   
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    try{
      return this.http.get<MarkNotifications>(`${this.url}auth/set-markasread`, axiosConfig);
    }catch(e){
      console.log(e);
    }
    
  
}
  references(data, token){
    let axiosConfig = {
      headers: {
        "Accept": "application/json",
        "site": "worker",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    try{
      return this.http.post<References>(`${this.url}auth/user/store-reference`, {
        user_id: data.user_id,
        last_company: data.last_company,
        manager_name:  data.manager_name, 
        manager_position: data.manager_position,
        manager_phone: data.manager_phone,
        position_finish: data.position_finish


      }, axiosConfig);
    }catch(error){
      console.log(error);
    }
  }
  addCv(data, token){
    let fb = new FormData();
    fb.append('file', data.file);
    let axiosConfig = {
      headers: {
        "Accept": "application/json",
        "site": "worker",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post<Document>(`${this.url}auth/user/add-cv`,fb,axiosConfig);
  }
  deleteDocuments(token, id){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    try{
      return this.http.post(`${this.url}auth/user/document-delete`,{
        document_id: id
      }, axiosConfig);
    }catch(e){
      console.log(e);
    }
  }
  loginSocial(email){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    try{
      return this.http.post(`${this.url}auth/login-social`,{
        email: email
      }, axiosConfig);
    }catch(e){
      console.log('imprime esto');
    }
  }

  payment(requestId, start_date, end_date, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    try{
      return this.http.post(`${this.url}auth/payments/summary`,{
        request_id: requestId,
        start_date: start_date,
        end_date: end_date
      }, axiosConfig);
    }catch(e){
      console.log('imprime esto');
    }
  }
  paymentStripe(token, amount, description, source){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    try{
      return this.http.post(`${this.url}auth/payments/stripe`,{
        amount: amount,
        description: description,
        source: source
      }, axiosConfig);
    }catch(e){
      console.log('imprime esto');
    }
  }
  getHrsWorker(iduser, idrequest, token){
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "site": "contractor",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`
      }
    };
    try{
      return this.http.post(`${this.url}checkin/get-hrs-worker`,{
        user_id: iduser,
        request_id: idrequest,
      }, axiosConfig);
    }catch(e){

    }
  }


}
