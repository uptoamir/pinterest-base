import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonBrief() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Skeleton
          sx={{ bgcolor: "grey.400", borderRadius: ".5rem" }}
          variant="rectangular"
          width="100%"
          height={170}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            bgcolor: "grey.200",
            borderRadius: ".8rem",
            marginTop: "1rem",
          }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            bgcolor: "grey.200",
            borderRadius: ".8rem",
            marginTop: "1rem",
          }}
        />
      </Box>
    </>
  );
}
