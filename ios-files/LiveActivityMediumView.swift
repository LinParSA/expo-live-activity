import SwiftUI
import WidgetKit

struct LiveActivityMediumView: View {
  let contentState: LiveActivityAttributes.ContentState
  let attributes: LiveActivityAttributes
  @Binding var imageContainerSize: CGSize?
  let alignedImage: (String, HorizontalAlignment, Bool) -> AnyView

  var body: some View {
    let padding = attributes.resolvedPadding(defaultPadding: 16)
    let titleColor = Color(hex: attributes.titleColor ?? "#FFFFFF")
    let subtitleColor = Color(hex: attributes.subtitleColor ?? "#AAAAAA")

    VStack(alignment: .leading, spacing: 8) {
      // ヘッダー: アクティビティ名 + アイコン
      HStack {
        Text("ランニング")
          .font(.subheadline)
          .fontWeight(.semibold)
          .foregroundStyle(titleColor)
        Spacer()
        if let imageName = contentState.imageName {
          Image.dynamic(assetNameOrPath: imageName)
            .resizable()
            .scaledToFit()
            .frame(width: 28, height: 28)
        }
      }

      // 3カラム指標
      HStack(alignment: .top, spacing: 0) {
        // カラム1: 経過時間
        VStack(alignment: .center, spacing: 2) {
          if let startDate = contentState.elapsedTimerStartDateInMilliseconds {
            ElapsedTimerText(startTimeMilliseconds: startDate, color: titleColor)
              .font(.title2)
              .fontWeight(.bold)
              .monospacedDigit()
          } else {
            Text("0:00")
              .font(.title2)
              .fontWeight(.bold)
              .monospacedDigit()
              .foregroundStyle(titleColor)
          }
          Text("時間")
            .font(.caption)
            .foregroundStyle(subtitleColor)
        }
        .frame(maxWidth: .infinity)

        // カラム2: ペース
        VStack(alignment: .center, spacing: 2) {
          Text(contentState.subtitle ?? "-:--")
            .font(.title2)
            .fontWeight(.bold)
            .monospacedDigit()
            .foregroundStyle(titleColor)
          Text("スプリット平均ペース (/km)")
            .font(.system(size: 9))
            .foregroundStyle(subtitleColor)
            .multilineTextAlignment(.center)
            .fixedSize(horizontal: false, vertical: true)
        }
        .frame(maxWidth: .infinity)

        // カラム3: 距離
        VStack(alignment: .center, spacing: 2) {
          Text(contentState.title)
            .font(.title2)
            .fontWeight(.bold)
            .monospacedDigit()
            .foregroundStyle(titleColor)
          Text("距離 (km)")
            .font(.caption)
            .foregroundStyle(subtitleColor)
        }
        .frame(maxWidth: .infinity)
      }
    }
    .padding(padding)
  }
}
