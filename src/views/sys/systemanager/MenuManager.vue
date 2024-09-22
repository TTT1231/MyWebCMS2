<script lang="ts" setup>
import { h, ref } from 'vue';
import { SVGHOME } from '@/enums/globalEnums';
import { useMenusStore } from '@/store/modules/menusModule';
import { MenusType } from '@/types/user';
import { useLang, useT } from '@/hooks/lang/useLang';


interface TreeType{
   title: string;
   key: number;
   icon?: any;
   children: TreeType[];
   ishide:Boolean;
}
const t=useT(); 
const {addCallBack}=useLang();
const menusStore= useMenusStore();
const menus=JSON.parse(JSON.stringify(menusStore.getAllMenus)) as MenusType[] ;

const checkKeys=ref<number[]>([]);
const expandKeys=ref<number[]>([]);
/**一维数组移除其childrens */
const menusFilterChildrens:Omit<MenusType,'childrens'>[]=[];
recurseFilterChildrens(menus);

let keys=JSON.parse(JSON.stringify(checkKeys.value)) as number[];

const treedata=ref<TreeType[]>(transformMenus(menus))
console.log(treedata);
function transformMenus(menuData:MenusType[]) {  
    return menuData.map(item => {
      // console.log(item)
        const { menuname, childrens, icon,_menuid,ishide } = item;  
        const filteredItem: TreeType = { 
         title:menuname, 
         key  :_menuid,
         icon :'',   
         children:[],
         ishide:ishide
         };
         if(!ishide){
             keys.push(_menuid);
         }else{
            // ss
            fiterParentsKey(item.parent_id)
         }
         if(icon!==''||icon!==undefined){
            filteredItem.icon=()=>h('img',{ src:`${SVGHOME}/menu/${icon}.svg` });
         }
         if ( childrens.length > 0&&childrens) {  
            filteredItem.children = transformMenus(childrens); // 递归调用  
         }  
  
        return filteredItem;  
    });  
}  
function recurseFilterChildrens(menus: MenusType[]){
   menus.forEach(item=>{
      if(item){
         menusFilterChildrens.push({
            _menuid :item._menuid,
            _submenuid:item._submenuid,
            icon:item.icon,
            ishide:item.ishide,
            menuname:item.menuname,
            menutype:item.menutype,
            parent_id:item.parent_id,
            path:item.path,
            role:item.role
         })
      }
      if(item.childrens.length>0&&item.childrens){
         recurseFilterChildrens(item.childrens);
      }
   })
}
//根据一维数组移除子节点移除从而移除其parent_key
function fiterParentsKey(parent_id:number){
   if(parent_id===-1){return;}

   for(let i=0;i<menusFilterChildrens.length;i++){

      if(menusFilterChildrens[i]._menuid===parent_id){
         //移除其所有parent_id
         const temp:number[]=[]
         keys.forEach(item=>{
            if(item!==parent_id){
               temp.push(item)
            }
         })
         keys=temp
         fiterParentsKey(menusFilterChildrens[i].parent_id)
        
     
      }
   }

}

const unrefTreeData=JSON.parse(JSON.stringify(treedata.value)) as TreeType[]
function tranLocale(tree:TreeType[]){
   tree.forEach(item=>{
      item.title=t(item.title);
      if(item.children.length>0&&item.children){
         tranLocale(item.children);
      }
   }) 
} 
tranLocale(treedata.value)
checkKeys.value=keys;

addCallBack(()=>{
   treedata.value=unrefTreeData;
   tranLocale(treedata.value)
})
menusFilterChildrens.forEach(item=>{
   expandKeys.value.push(item._menuid);
})
</script>

<template>
   <a-tree 
   v-model:checkedKeys="checkKeys"
   v-model:expanded-keys="expandKeys"
   checkable show-icon
   draggable 
   expand
    :tree-data="treedata">
   </a-tree>
 </template>
