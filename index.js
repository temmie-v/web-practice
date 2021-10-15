function is_hansha(r) {
    for (let x = 0; x < r.length; x++) {
        if (!r[x][x]) {
            return false;
        }
    }
    return true;
}

function is_kanbi(r) {
    for (let x = 0; x < r.length; x++) {
        for (let y = 0; y < r[x].length; y++) {
            if (x != y && !r[x][y] && !r[y][x]) {
                return false;
            }
        }
    }
    return true;
}

function is_suii(r) {
    for (let x = 0; x < r.length; x++) {
        for (let y = 0; y < r[x].length; y++) {
            for (let z = 0; z < r[y].length; z++) {
                if (r[x][y] && r[y][z] && !r[x][z]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function is_hantaishou(r) {
    for (let x = 0; x < r.length; x++) {
        for (let y = 0; y < r[x].length; y++) {
            if (r[x][y] && r[y][x] && x != y) {
                return false;
            }
        }
    }
    return true;
}

function is_hitaishou(r) {
    for (let x = 0; x < r.length; x++) {
        for (let y = 0; y < r[x].length; y++) {
            if (r[x][y] && r[y][x]) {
                return false;
            }
        }
    }
    return true;
}

function is_taishou(r) {
    for (let x = 0; x < r.length; x++) {
        for (let y = 0; y < r[x].length; y++) {
            if (r[x][y] && !r[y][x]) {
                return false;
            }
        }
    }
    return true;
}

function r_disp(r, num) {
    var display = document.getElementsByTagName('body');
    var fin = document.createElement('p');
    fin.className = 'tmp';
    var tbl = document.createElement('table');
    var tblBody = document.createElement('tbody');
    for (let i = 0; i < r.length + 1; i++) {
        var row = document.createElement('tr');
        for (let j = 0; j < r.length + 2; j++) {
            var cell = document.createElement('td');
            if (i == 0) {
                if (j == 0) {
                    var cellText = document.createTextNode("No. " + num);
                } else if (j == 1) {
                    var cellText = document.createTextNode("");
                } else {
                    var cellText = document.createTextNode(" " + String.fromCharCode(95 + j) + " ");
                }
            } else if (i != 0 && j == 1) {
                var cellText = document.createTextNode(String.fromCharCode(96 + i));
            } else if (i > 0 && j > 1 && r[i - 1][j - 2] == 1) {
                var cellText = document.createTextNode(" ○ ");
            } else if (j == 0) {
                var cellText = document.createTextNode("　　　");
            } else {
                var cellText = document.createTextNode(" 　 ");
            }
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    fin.appendChild(tbl);
    display[0].appendChild(fin);
}


function solve(option, n, disp) {
    var ans = 0;
    for (let i = 0; i < 1 << (n * n); i++) {
        var flag = true, r = new Array(n);
        for (let j = 0; j < n; j++) {
            r[j] = new Array(n).fill(0);
        }
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                r[j][k] = (i >> (j * n + k)) % 2;
            }
        }
        var rel = [is_hansha(r), is_kanbi(r), is_suii(r), is_hantaishou(r), is_hitaishou(r), is_taishou(r)];
        for (let j = 0; j < 6; j++) {
            if ((option[j] == 'must' && !rel[j]) || option[j] == 'must_not' && rel[j]) {
                flag = false;
            }
        }
        if (flag) {
            ans++;
            if (ans <= disp || disp < 0) {
                r_disp(r, ans);
            }
        }
    }
    return ans;
}

window.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('run');
    button.addEventListener('click', function () {
        while (true) {
            var element = document.getElementsByClassName('tmp');
            if (element.length == 0) {
                break;
            } else {
                for (let i = 0; i < element.length; i++) {
                    element[i].remove();
                }
            }
        }
        var n = document.getElementById('n_size').value;
        var option = new Array(6);
        option[0] = document.getElementById('hansha').value;
        option[1] = document.getElementById('kanbi').value;
        option[2] = document.getElementById('suii').value;
        option[3] = document.getElementById('hantaishou').value;
        option[4] = document.getElementById('hitaishou').value;
        option[5] = document.getElementById('taishou').value;
        var dis = document.getElementById('r_display').value;
        var disp = 0;
        if (dis == 'yes') {
            disp--;
        } else if (dis == 'five') {
            disp = 5;
        }
        document.getElementById('res').innerText = solve(option, n, disp);
        document.getElementById('res_from').innerText = 1 << (n * n);
    });
});