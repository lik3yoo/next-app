"use client"
import type { FormProps } from "antd"
import { Button, Form, Input, Checkbox, Select } from "antd"
import ajax from "@/src/app/utils/ajax"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

type FieldType = {
  username?: string
  password?: string
  remember?: string
}
export default function Login() {
  const router = useRouter()
  const t = useTranslations("loginPage")
  const login = async (data: FieldType) => {
    ajax({
      url: "/api/login",
      data,
      method: "POST",
    })
      .then(() => {
        router.push("/")
      })
      .catch((err: Error) => {
        console.log(err)
      })
  }

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    login(values)
  }
  const changeLanguage = (value: "en" | "zh") => {
    console.log(value)
    // 修改浏览器cookie
    window.document.cookie = `lang=${value};path=/;max-age=86400`
    window.location.reload()
  }

  return (
    <div className="relative h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className="absolute top-1/4 left-1/2 -translate-x-1/2"
      >
        <Form.Item<FieldType>
          label={t("username")}
          name="username"
          rules={[{ required: true, message: t("usernamePlaceholder") }]}
        >
          <Input placeholder={t("usernamePlaceholder")} />
        </Form.Item>

        <Form.Item<FieldType>
          label={t("password")}
          name="password"
          rules={[{ required: true, message: t("passwordPlaceholder") }]}
        >
          <Input.Password placeholder={t("passwordPlaceholder")} />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>{t("remember")}</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Select
        className="absolute w-28 top-6 right-4"
        onChange={changeLanguage}
        options={[
          {
            value: "zh",
            label: "中文",
          },
          {
            value: "en",
            label: "English",
          },
        ]}
      />
    </div>
  )
}
