//?
import React, { useState } from "react";
import { message, Divider } from "antd";
import { useFileUpload } from "use-file-upload";
import { FaFolderOpen } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import { useLngContext } from "../../new-user/context/LngContext";
import handleUpload from "./handleUpload";
import "./fileUpload.css";

// todo
export default function FileUpload({ className }) {
	//
	const [myFile, selectFile] = useFileUpload();
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);
	const strings = useLngContext();

	//
	return (
		<div className={className}>
			<Divider style={{ color: "red" }}>File Upload</Divider>

			<div className="d-flex justify-content-between">
				{isValid && (
					<div>
						<img
							alt="rrr"
							src={myFile?.source}
							height="38px"
							data-tip
							data-for="custom-img"
						/>

						<ReactTooltip
							id="custom-img"
							type="warning"
							effect="solid"
							place="bottom"
						>
							<img
								alt="rrr"
								src={myFile?.source}
								width="300"
							/>
						</ReactTooltip>
					</div>
				)}

				<div className=" mt-1">
					{myFile ? (
						<div>
							<span> Name: </span>
							<span className="text-primary">
								{" "}
								{myFile.name}{" "}
							</span>
							<span className="ml-2">Size: </span>
							<span className="text-primary">
								{Math.ceil(myFile.size / 1000)} KB
							</span>
						</div>
					) : (
						<span>
							{"Ընտրեք նկարը"} ( "առավելագույն չափը:" 500KB )
						</span>
					)}
				</div>

				<div>
					<button
						type="button"
						className="btn btn-primary btn-sm"
						style={{ lineHeight: 0.6 }}
						onClick={(e) => {
							selectFile(
								{ accept: "image/*" },
								({ source, name, size, file }) => {
									if (
										file.type !== "image/jpeg" &&
										file.type !== "image/jpg" &&
										file.type !== "image/png"
									) {
										setIsValid(false);
										message.error("Ընտրված ֆայլը նկար չէ։");
										return;
									}
									if (size > 500000) {
										message.error(
											"Ընտրված ֆայլի ծավալը մեծ է 500KB։"
										);
										setIsValid(false);
										return;
									}

									setIsValid(true);
								}
							);
						}}
					>
						<FaFolderOpen size={18} />
						{"\u00A0\u00A0"}
						{myFile ? "Փոխել" : "Ընտրել"}
					</button>
				</div>
			</div>

			<div className="d-grid pt-3">
				<button
					type="submit"
					className="btn btn-success btn-block btn-sm "
					disabled={!isValid}
					onClick={() =>
						handleUpload(myFile.file, setIsValid, setLoading)
					}
				>
					{loading && (
						<span className="spinner-border spinner-border-sm"></span>
					)}
					{"\u00A0\u00A0 Վերբեռնել"}
				</button>
			</div>
		</div>
	);
}
