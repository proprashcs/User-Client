export class Login{
    name:String;
    password:String;
    constructor(){}
}

export class AllService{
    name:String;    
    constructor(){}
}

export class SerSecton{
    name:String;    
    constructor(){}
}

export class ContainerItems{
    serviceName:String;
    containerId:number;
    constructor(){}
}

export class SearchItems{
    itemFlag: number;
    service: string;
    sectionId:number;
    search: string;
    constructor(){}
}

export class CreateItem{    
    service: string;
    sectionId:number;
    itemTypeId: number;
    itemId: number;
    constructor(){}
}

export class addCheck{
    itemId:number[]
}
export class RefreshmentModel {
    item_id: string;
    item_resource_id: string;
    item_seq_id: string;
    item_type_id: string;
    resource_image_url: string;
    resource_title: string;
     constructor(){}
}