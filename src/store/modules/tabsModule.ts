import { StorageEnum } from '@/enums/storage';
import { MenusType } from '@/types/user';
import { persistent } from '@/utils/permission/persistent';
import { defineStore } from 'pinia';

interface BreadNavItem{
    title:string,
    path:string,
    key?:string
}
interface TabsType{
    currentTabs:BreadNavItem[],
    allTabs:BreadNavItem[],
    currentIndex:string,
    lastIndex:string
}

const filterMenusComplete:BreadNavItem[] = [];
function filterMenusOfTabs(menus:MenusType[]) {
    menus.forEach(item => {
        if(item.menutype === 'node'){
            if(!item.ishide){
                filterMenusComplete.push({
                    title:item.menuname,
                    path:item.path
                });
            }
        }else{
            filterMenusOfTabs(item.childrens);
        }
    });
}

export const useTabsStore = defineStore('tabs', {
   state: (): TabsType => ({
      currentTabs:[],
      allTabs:[],
      currentIndex:'',
      lastIndex:''

   }),
   getters: {
      getCurrentTabs: (state) => state.currentTabs,
      getCurrentIndex: (state) => state.currentIndex,
      getAllTabs: (state) => state.allTabs
   },
   actions: {
      setCurrentTabs(tabs:BreadNavItem[]){
          this.currentTabs=tabs
      },
      setCurrentIndex(index:string){

        this.currentIndex=index;
        persistent.setSession(StorageEnum.CURRENTINDEX,this.currentIndex)

      },
      deleteCurrentTabs(tatgetKey:string){
        let deleteKey=-1
        let filterTabs:BreadNavItem[]=[]
        this.currentTabs.forEach((item,i)=>{
            if(item.path===tatgetKey){
                deleteKey=i;
            }else{
                filterTabs.push(item)
            }
        })
        //更新tabs
        this.currentTabs=filterTabs
        persistent.setSession(StorageEnum.CURRENTTABS,this.currentTabs)

        if(deleteKey===-1) return;
        //不相等不需要更新currentIndex
        if(this.currentIndex!==tatgetKey){return;}

        //更新currentIndex

        if (this.currentTabs.length >0&& this.currentIndex === tatgetKey) {
            if (deleteKey-1 >= 0) {
               //   alert('删除后回到上一级')
               this.currentIndex = this.currentTabs[deleteKey-1].path;
            } else {
                if(deleteKey===0){
                    this.currentIndex = this.currentTabs[deleteKey].path;
                }else{
                    //deleteKey<0
                }
            }
         } else {
            if(this.currentTabs.length===0){
                this.currentIndex=''
            }else{
                this.currentIndex = this.currentTabs[0].path;
            }

         }
         //最后这里index是删除后当前索引
         persistent.setSession(StorageEnum.CURRENTINDEX,this.currentIndex)
      },
      addCurrentTabs(path:string){
        console.log(path);
        let addTab:{
            path:string,
            title:string
            }={
                path:'',
                title:''
            }
        let notInTabs=true;
        this.allTabs.forEach(item=>{
            if(item.path===path){
                addTab={
                    path:item.path,
                    title:item.title
                }
            }
        })
        this.currentTabs.forEach(item=>{
            if(item.path===path){
                notInTabs=false;
            }
        })
        if(notInTabs&&addTab.path!==''){
            this.currentTabs.push(addTab);
            persistent.setSession(StorageEnum.CURRENTTABS,this.currentTabs)

            this.currentIndex=path;
            persistent.setSession(StorageEnum.CURRENTINDEX,this.currentIndex)
    
        }
        else{
            if(this.currentIndex===path){

            }else{
                this.currentIndex=path;
                persistent.setSession(StorageEnum.CURRENTINDEX,this.currentIndex)
            }
        }

      },
  
       setAllTabs(tabs:MenusType[]){
          filterMenusOfTabs(tabs);
          console.log(filterMenusComplete)
          this.allTabs=filterMenusComplete;
      },
      restoreData(){
        let menusStr = persistent.getSessionOfKey(StorageEnum.MENUS)
        let currenttabsStr=persistent.getSessionOfKey(StorageEnum.CURRENTTABS)
        let currentIndexStr=persistent.getSessionOfKey(StorageEnum.CURRENTINDEX)
        if(menusStr!==''&&menusStr!==null){
            let menus=JSON.parse(JSON.stringify(menusStr)) as MenusType[]
            console.log('restoreTabs');
            filterMenusOfTabs(menus);
            this.allTabs=filterMenusComplete
        }
        if(currenttabsStr!==''&&currenttabsStr!==null){
            let currenttabs=JSON.parse(JSON.stringify(currenttabsStr)) as BreadNavItem[]
            this.currentTabs=currenttabs
        }
        if(currentIndexStr!==''&&currentIndexStr!==null){
            this.currentIndex=currentIndexStr
        }
      }
   },
   persist: false
});
