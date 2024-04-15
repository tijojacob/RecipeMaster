import { Directive, ElementRef, HostBinding, HostListener, Renderer2, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{
    part : any = this.temRef.nativeElement.querySelectorAll('.show');
    constructor(private temRef: ElementRef, private vcRef :ViewContainerRef, private renderer : Renderer2){

    }
    @HostBinding('class.show') dropdown : boolean = false;
       
    @HostListener('click') onddClick()
    {
        console.log('hello');
        if(this.dropdown===false)
        {               
            this.renderer.addClass(this.temRef.nativeElement.children[1],"show")
        }
        else{                   
            this.renderer.removeClass(this.temRef.nativeElement.children[1],"show")
        }
        this.dropdown=!this.dropdown;
    }
}