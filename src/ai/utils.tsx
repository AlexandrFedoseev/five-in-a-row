export class AIUtils {
    public static replace7x(s: string): string[] {
        const a: string[] = []
        let pos = -1;
        while ((pos = s.indexOf('x', pos + 1)) !== -1) {
            a[a.length] = s.substr(0, pos) + '7' + s.substr(pos + 1);
        }
        return a;
    }

    public static reverseString(s: string): string {
        let str = '';
        for (let i = s.length - 1; i >= 0; i--)
            str += s[i];
        return str;
    }
}