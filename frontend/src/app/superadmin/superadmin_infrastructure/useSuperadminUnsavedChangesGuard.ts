// INFRASTRUCTURE BOUNDARY: Zero-business data-loss prevention primitive; business forms supply their own dirty state/message.
// DATA FLOW: Superadmin UI → useSuperadminUnsavedChangesGuard → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: form dirty state → browser/in-app navigation interception → module confirmation → allow/block navigation.
// RESPONSIBILITY: Protects dirty Superadmin forms from browser exits and Next.js in-app navigation without owning business state.
import { useCallback, useEffect, useRef } from 'react';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_components/SuperadminFeedback/SuperadminConfirmProvider';
/**
 * Purpose: Protects dirty Superadmin forms from browser exits and Next.js in-app navigation without owning business state.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminUnsavedChangesGuard(isDirty: boolean, warningMessage = 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.') {
    const { confirm } = useSuperadminConfirm(); const dirtyRef=useRef(isDirty); const bypassRef=useRef(false); dirtyRef.current=isDirty;
    const ask=useCallback(()=>confirm({title:'Unsaved Changes',message:warningMessage,type:'warning',confirmText:'Leave Page',cancelText:'Stay'}),[confirm,warningMessage]);
// EFFECT INTENT: registers/removes a browser event listener and keeps the listener aligned with its captured values.
    useEffect(()=>{const beforeUnload=(event:BeforeUnloadEvent)=>{if(!dirtyRef.current||bypassRef.current)return;event.preventDefault();event.returnValue='';};
        const clickCapture=async(event:MouseEvent)=>{if(!dirtyRef.current||bypassRef.current)return;const target=(event.target as HTMLElement).closest('a') as HTMLAnchorElement|null;if(!target?.href||target.target==='_blank'||target.origin!==window.location.origin||target.href===window.location.href)return;event.preventDefault();event.stopPropagation();if(await ask()){bypassRef.current=true;window.location.assign(target.href);}};
        window.addEventListener('beforeunload',beforeUnload);document.addEventListener('click',clickCapture,true);
        return()=>{window.removeEventListener('beforeunload',beforeUnload);document.removeEventListener('click',clickCapture,true);};
    },[ask]);
}
