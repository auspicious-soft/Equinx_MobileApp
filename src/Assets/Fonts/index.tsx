const FONTS = {
  bold: "BricolageGrotesque_Condensed-Bold",
  extraBold: "BricolageGrotesque_Condensed-ExtraBold",
  extraLight: "BricolageGrotesque_Condensed-ExtraLight",
  light: "BricolageGrotesque_Condensed-Light",
  medium: "BricolageGrotesque_Condensed-Medium",
  regular: "BricolageGrotesque_Condensed-Regular",
  semiBold: "BricolageGrotesque_Condensed-SemiBold",
};

export default FONTS;

export type FontFamilyType = keyof typeof FONTS;
