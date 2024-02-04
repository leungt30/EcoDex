import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#306844",
        backgroundColor: "#404040",
        alignItems: "center",
        justifyContent: "center",
    },
    nav: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "space-between",
        padding: 10,
    },
    map: {
        flex: 1,
        minHeight: '100%',
        minWidth: '100%'
    }
});

export default styles;
