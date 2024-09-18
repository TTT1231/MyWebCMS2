/**
 * @description 异步并行任务有效
 * 该函数接受一个异步函数作为参数，
 * @returns 返回一个新函数，新函数只能被调用一次，多次调用返回一次结果
 */

export function asyncOne(fn: (...args: any[]) => Promise<any>):(...args: any[]) => Promise<any> {
   const map: Record<
      string,
      {
         resolve: any[];
         reject: any[];
         isPending: boolean;
      }|undefined
   > = {};
   return (...args: any[]) => {
     return new Promise((resolve, reject) => {
         const key = JSON.stringify(args);
         if (!map[key]) {
            map[key] = {
               resolve: [],
               reject: [],
               isPending: false
            };
         }
         const state = map[key]!;
         state.resolve.push(resolve);
         state.reject.push(reject);
         if(state.isPending) return;
         state.isPending=true;
         console.log(state)
         fn(...args)
         .then((result)=>{
            state.resolve.forEach(res=>res(result))
         })
         .catch((error)=>{
            state.reject.forEach(rej => rej(error));
         })
         .finally(()=>{
            console.log('finally');
            delete map[key];

         })
        })
    }
};
// export function asyncOne(fn: (...args: any[]) => Promise<any>): (...args: any[]) => Promise<any> {
//     const map: Record<
//         string,
//         {
//             resolve: ((value: any) => void)[];
//             reject: ((reason?: any) => void)[];
//             isPending: boolean;
//         } | undefined
//     > = {};

//     return (...args: any[]): Promise<any> => {
//         return new Promise((resolve, reject) => {
//             const key = JSON.stringify(args);
//             if (!map[key]) {
//                 map[key] = {
//                     resolve: [],
//                     reject: [],
//                     isPending: false
//                 };
//             }
//             const state = map[key]!;
//             state.resolve.push(resolve);
//             state.reject.push(reject);

//             if (state.isPending) return;

//             state.isPending = true;

//             fn(...args)
//                 .then((result) => {
//                     console.log('qweqwe')
//                     state.resolve.forEach(res => res(result));
//                 })
//                 .catch((error) => {
//                     state.reject.forEach(rej => rej(error));
//                 })
//                 .finally(() => {
//                     console.log('finally');
//                     delete map[key];
//                 });
//         });
//     };
// }