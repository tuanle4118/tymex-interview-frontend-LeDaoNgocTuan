"use client";
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import CustomSlider from "@components/custom-slider";
import GlowingButton from "@components/glowing-button";
import { useState } from "react";
import TransparentInput from "@/app/components/transparent-input";
import TransparentSelect from "@components/transparent-select";
import { Col, Row } from "antd";

export default function FilterPanel() {
  const [values, setValues] = useState([10, 200]);
  const labelClasses = "mb-2 text-sm font-semibold text-[#89888B]";

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <TransparentInput
          placeholder="Quick search"
          prefix={<SearchOutlined />}
        />
      </Col>

      <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 24 }}>
        <CustomSlider
          values={values}
          onChange={setValues}
          min={0.01}
          max={200}
          title="PRICE"
        />
      </Col>

      <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 24 }}>
        <p className={labelClasses}>TIER</p>
        <TransparentSelect options={[]} placeholder="Select tier" />
      </Col>

      <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 24 }}>
        <p className={labelClasses}>THEME</p>
        <TransparentSelect options={[]} placeholder="Select theme" />
      </Col>

      <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 24 }}>
        <p className={labelClasses}>TIME</p>
        <TransparentSelect options={[]} placeholder="Select time" />
      </Col>

      <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 24 }}>
        <p className={labelClasses}>PRICE</p>
        <TransparentSelect options={[]} placeholder="Select price" />
      </Col>

      <Col
        className="flex items-center justify-center gap-20"
        xs={{ span: 24 }}
        sm={{ span: 12 }}
        xl={{ span: 24 }}
      >
        <span className="flex cursor-pointer text-nowrap py-2 text-white hover:bg-slate-600/70 xl:gap-3">
          <CloseCircleFilled className="text-yellow-400" /> Reset filter
        </span>
        <GlowingButton label="Search" width="10rem" />
      </Col>
    </Row>
  );
}
