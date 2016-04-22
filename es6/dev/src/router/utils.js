import { isPresent, isBlank } from 'angular2/src/facade/lang';
import { StringMapWrapper } from 'angular2/src/facade/collection';
export class TouchMap {
    constructor(map) {
        this.map = {};
        this.keys = {};
        if (isPresent(map)) {
            StringMapWrapper.forEach(map, (value, key) => {
                this.map[key] = isPresent(value) ? value.toString() : null;
                this.keys[key] = true;
            });
        }
    }
    get(key) {
        StringMapWrapper.delete(this.keys, key);
        return this.map[key];
    }
    getUnused() {
        var unused = {};
        var keys = StringMapWrapper.keys(this.keys);
        keys.forEach(key => unused[key] = StringMapWrapper.get(this.map, key));
        return unused;
    }
}
export function normalizeString(obj) {
    if (isBlank(obj)) {
        return null;
    }
    else {
        return obj.toString();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUNyZmVBNmI1LnRtcC9hbmd1bGFyMi9zcmMvcm91dGVyL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsU0FBUyxFQUFFLE9BQU8sRUFBQyxNQUFNLDBCQUEwQjtPQUNwRCxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0NBQWdDO0FBRS9EO0lBSUUsWUFBWSxHQUF5QjtRQUhyQyxRQUFHLEdBQTRCLEVBQUUsQ0FBQztRQUNsQyxTQUFJLEdBQTZCLEVBQUUsQ0FBQztRQUdsQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRztnQkFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXO1FBQ2IsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLE1BQU0sR0FBeUIsRUFBRSxDQUFDO1FBQ3RDLElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0FBQ0gsQ0FBQztBQUdELGdDQUFnQyxHQUFRO0lBQ3RDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEIsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuZXhwb3J0IGNsYXNzIFRvdWNoTWFwIHtcbiAgbWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBrZXlzOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgaWYgKGlzUHJlc2VudChtYXApKSB7XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2gobWFwLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICB0aGlzLm1hcFtrZXldID0gaXNQcmVzZW50KHZhbHVlKSA/IHZhbHVlLnRvU3RyaW5nKCkgOiBudWxsO1xuICAgICAgICB0aGlzLmtleXNba2V5XSA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIFN0cmluZ01hcFdyYXBwZXIuZGVsZXRlKHRoaXMua2V5cywga2V5KTtcbiAgICByZXR1cm4gdGhpcy5tYXBba2V5XTtcbiAgfVxuXG4gIGdldFVudXNlZCgpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgdmFyIHVudXNlZDoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICB2YXIga2V5cyA9IFN0cmluZ01hcFdyYXBwZXIua2V5cyh0aGlzLmtleXMpO1xuICAgIGtleXMuZm9yRWFjaChrZXkgPT4gdW51c2VkW2tleV0gPSBTdHJpbmdNYXBXcmFwcGVyLmdldCh0aGlzLm1hcCwga2V5KSk7XG4gICAgcmV0dXJuIHVudXNlZDtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVTdHJpbmcob2JqOiBhbnkpOiBzdHJpbmcge1xuICBpZiAoaXNCbGFuayhvYmopKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iai50b1N0cmluZygpO1xuICB9XG59XG4iXX0=