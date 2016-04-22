import { isArray, isString, isBlank, assertionsEnabled } from '../facade/lang';
import { BaseException } from '../facade/exceptions';
export function assertArrayOfStrings(identifier, value) {
    if (!assertionsEnabled() || isBlank(value)) {
        return;
    }
    if (!isArray(value)) {
        throw new BaseException(`Expected '${identifier}' to be an array of strings.`);
    }
    for (var i = 0; i < value.length; i += 1) {
        if (!isString(value[i])) {
            throw new BaseException(`Expected '${identifier}' to be an array of strings.`);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtQ3JmZUE2YjUudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9hc3NlcnRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0I7T0FDckUsRUFBQyxhQUFhLEVBQUMsTUFBTSxzQkFBc0I7QUFFbEQscUNBQXFDLFVBQWtCLEVBQUUsS0FBVTtJQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLENBQUM7SUFDVCxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sSUFBSSxhQUFhLENBQUMsYUFBYSxVQUFVLDhCQUE4QixDQUFDLENBQUM7SUFDakYsQ0FBQztJQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxhQUFhLENBQUMsYUFBYSxVQUFVLDhCQUE4QixDQUFDLENBQUM7UUFDakYsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0FycmF5LCBpc1N0cmluZywgaXNCbGFuaywgYXNzZXJ0aW9uc0VuYWJsZWR9IGZyb20gJy4uL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnLi4vZmFjYWRlL2V4Y2VwdGlvbnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0QXJyYXlPZlN0cmluZ3MoaWRlbnRpZmllcjogc3RyaW5nLCB2YWx1ZTogYW55KSB7XG4gIGlmICghYXNzZXJ0aW9uc0VuYWJsZWQoKSB8fCBpc0JsYW5rKHZhbHVlKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWlzQXJyYXkodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYEV4cGVjdGVkICcke2lkZW50aWZpZXJ9JyB0byBiZSBhbiBhcnJheSBvZiBzdHJpbmdzLmApO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoIWlzU3RyaW5nKHZhbHVlW2ldKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYEV4cGVjdGVkICcke2lkZW50aWZpZXJ9JyB0byBiZSBhbiBhcnJheSBvZiBzdHJpbmdzLmApO1xuICAgIH1cbiAgfVxufVxuIl19