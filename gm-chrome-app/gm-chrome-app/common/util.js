(function (scrope) {
    function str2ab(str) {
        const buf = new ArrayBuffer(str.length);//2 bytes for each char
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }

    function versionDiff(newVersion, oldVersion) {
        const nv = newVersion.split('.'), ov = oldVersion.split('.');

        if (nv[0] > ov[0]) {
            return 'major';
        }

        if (nv[1] > ov[1]) {
            return 'minor';
        }

        if (nv[2] > ov[2]) {
            return 'patch';
        }

        return false;
    }

    const Util = {
        str2ab,
        ab2str,
        versionDiff
    };

    scrope.Util = Util;
})(window);