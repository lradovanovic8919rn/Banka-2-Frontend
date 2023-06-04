import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CompanyContract} from "../models/stock-exchange.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class OtcService {
  private contractSubject = new BehaviorSubject<CompanyContract | null>(null);
  public contract$ = this.contractSubject.asObservable();
  private headers
  private token: string

  constructor(private httpClient: HttpClient) {

    if (localStorage.getItem("token") !== null) {
      this.token = localStorage.getItem("token")!
    } else {
      this.token = sessionStorage.getItem("token")!
    }

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.token}`)
  }

  resetToken() {
    this.token = ''
  }

  setToken(token: string) {
    this.token = token
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${token}`)

  }

  getAllCompanyContracts(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8082/api/otc`
      , {headers: this.headers})
  }

  getCompanyContractById(id: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8082/api/otc/${id}`
      , {headers: this.headers})
  }

  openCompanyContract(
    companyId: string,
    contractStatus: string,
    contractNumber: string,
    description: string
  ): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8082/api/otc/open`,
      {
        companyId: companyId,
        contractStatus: contractStatus,
        contractNumber: contractNumber,
        description: description
      },
      {headers: this.headers}
    );
  }

  editCompanyContract(
    companyId: string,
    contractStatus: string,
    contractNumber: string,
    description: string
  ): Observable<any> {
    return this.httpClient.patch<any>(`http://localhost:8082/api/otc/edit`,
      {
        companyId: companyId,
        contractStatus: contractStatus,
        contractNumber: contractNumber,
        description: description
      },
      {headers: this.headers})
  }

  closeCompanyContract(id: string): Observable<any> {
    return this.httpClient.patch<any>(`http://localhost:8082/api/otc/close/${id}`,
      {

      },
      {headers: this.headers}
    );
  }

  deleteCompanyContract(id: string): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:8082/api/otc/delete/${id}`
      , {headers: this.headers})
  }

  getAllElements(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8082/api/otc/elements`
      , {headers: this.headers})
  }

  getElementById(id: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8082/api/otc/element/${id}`
      , {headers: this.headers})
  }

  getAllContractElements(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8082/api/otc/contract_elements`
      , {headers: this.headers})
  }

  getElementByContractId(id: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8082/api/otc/contract_element/${id}`
      , {headers: this.headers})
  }

  createElement(
    contractId: string,
    elementId: string,
    buyOrSell: string,
    transactionElement: string,
    balance: string,
    currency: string,
    amount: number,
    priceOfOneElement: number
  ): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8082/api/otc/add_element`,
      {
        contractId: contractId,
        elementId: elementId,
        buyOrSell: buyOrSell,
        transactionElement: transactionElement,
        balance: balance,
        currency: currency,
        amount: amount,
        priceOfOneElement: priceOfOneElement
      },
      {headers: this.headers})
  }

  editElement(
    contractId: string,
    elementId: string,
    buyOrSell: string,
    transactionElement: string,
    balance: string,
    currency: string,
    amount: number,
    priceOfOneElement: number
  ): Observable<any> {
    return this.httpClient.patch<any>(`http://localhost:8082/api/otc/edit_element`,
      {
        contractId: contractId,
        elementId: elementId,
        buyOrSell: buyOrSell,
        transactionElement: transactionElement,
        balance: balance,
        currency: currency,
        amount: amount,
        priceOfOneElement: priceOfOneElement
      },
      {headers: this.headers})
  }

  deleteElement(contractId: string, elementId: string): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:8082/api/otc/remove_element/${contractId}/${elementId}`
      , {headers: this.headers})
  }

  notify(contract: CompanyContract) {
    this.contractSubject.next(contract);
    this.contractSubject.next(null);
  }


}