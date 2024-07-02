export const trimWallet = (str, lastNum) => {
    var res = str.slice(0, 15) + "...." + str.slice(lastNum -15, lastNum);
    return res;
}