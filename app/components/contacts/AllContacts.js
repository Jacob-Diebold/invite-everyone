import React from "react";
import { StyleSheet, Text, SectionList } from "react-native";
const sectionKeyExtract = (item, index) => {
  // return item + index;
  return item.id + index;
};
const AllContacts = React.forwardRef(({ data, renderItem }, ref) => {
  // const ref = useRef()
  // console.log(data)
  return (
    <SectionList
      ref={ref}
      sections={data}
      renderItem={renderItem}
      keyExtractor={sectionKeyExtract}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
});

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
});

export default AllContacts;
